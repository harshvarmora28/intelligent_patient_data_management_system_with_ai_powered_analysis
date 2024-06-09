const { geminiModel } = require('../config/gemini');
const { openai } = require('../config/open_ai');
const GPTAnalysis = require('../model/gpt_analysis.model');
const { sendNotificationToPatient } = require('./mail_controller');

const addAnalysis = async (analysis) => {
	try {
		await GPTAnalysis.create(analysis);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

const getGeminiResponse = async (prompt) => {
	try {
		const geminiRes = await geminiModel.generateContent(prompt);
		const feedback = geminiRes.response.text().replace('*', '');
		return feedback;
	} catch (error) {
		res.status(500).send('Internal server error');
	}
};

const updateGPTResponse = async (req, res) => {
	try {
		const { id } = req.params;
		const { accepted, response } = req.body;
		console.log(req);
		await GPTAnalysis.findByIdAndUpdate(id, {
			accepted,
			custom_doctor_response: response,
		});
		res.send('Updated');
		const mailConfig = {
			...req.body.mailConfig,
			doctorNote: response,
			doctorId: req.user._id,
			doctorName: req.user.name,
		};
		await sendNotificationToPatient(mailConfig)
			.then(() => {
				console.log('Mail sent');
			})
			.catch((error) => {
				console.log('mail error', error);
			});
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

const getOpenAIresponse = async (query) => {
	try {
		if (!query) {
			return;
		}

		const prompt = {
			role: 'user',
			content: query,
		};

		return '';

		const completion = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [prompt],
			temperature: 0.2,
		});
		return completion.choices[0].message.content.replace('*', '');
	} catch (error) {
		console.error('Error:', error);
		return;
	}
};

module.exports = {
	addAnalysis,
	generateAnalysis: getGeminiResponse,
	updateGPTResponse,
	getOpenAIresponse,
};
