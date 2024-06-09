const nodemailer = require('nodemailer');
const fs = require('fs');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.MAIL,
		pass: process.env.MAIL_PASSWORD,
	},
});

const sendNotificationToDoctor = async (document) => {
	//Server\views\email_templates\Doctor.html
	let emailTemplate = fs.readFileSync(
		'./views/email_templates/Doctor.html',
		'utf-8'
	);
	emailTemplate = emailTemplate
		.replace('{{patientID}}', document.user._id.toString())
		.replace('{{patientName}}', document.user.name)
		.replace('{{currentSymptoms}}', document.current_symptoms.description)
		.replace(
			'{{medicalHistory}}',
			document.medical_history.past_medical_history
		);

	const mailOptions = {
		from: process.env.MAIL,
		to: document.toEmail,
		subject: `Patient Query from ${document.user.name}`,
		html: emailTemplate,
	};
	return await transporter.sendMail(mailOptions);
};

const sendNotificationToPatient = async (document) => {
	console.log(document);
	//Server\views\email_templates\Doctor.html
	let emailTemplate = fs.readFileSync(
		'./views/email_templates/Patient.html',
		'utf-8'
	);
	emailTemplate = emailTemplate
		.replace('{{doctorId}}', document.doctorId.toString())
		.replace('{{doctorName}}', document.doctorName)
		.replace('{{caseSymptoms}}', document.caseSymptoms)
		.replace('{{aiResponse}}', document.aiResponse)
		.replace('{{doctorNote}}', document.doctorNote);

	const mailOptions = {
		from: process.env.MAIL,
		to: document.toEmail,
		subject: `Update from Dr. ${document.doctorName}`,
		html: emailTemplate,
	};
	return await transporter.sendMail(mailOptions);
};

module.exports = { sendNotificationToDoctor, sendNotificationToPatient };
