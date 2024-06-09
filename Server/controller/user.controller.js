const User = require('../model/user.model');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
	const secretKey = process.env.SECRET_KEY;
	const payload = {
		id,
	};
	const token = jwt.sign(payload, secretKey, { expiresIn: '1w' });
	return token;
};

const createUser = async (req, res) => {
	try {
		const { name, date_of_birth, city, state, gender, email, password, role } =
			req.body;
		const new_user = new User({
			name,
			email,
			password,
			role,
			gender,
			date_of_birth,
			city,
			state,
		});
		await new_user
			.save()
			.then((user) => {
				res
					.status(201)
					.send(`${user.role} created successfully for email ${user.email}`);
			})
			.catch((error) => {
				console.log(error);
				throw new Error('Error creating user');
			});
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		console.log(email, password);
		const user = await User.findOne({ email });
		console.log(user);
		if (!user) res.status(404).send('user not found');
		const compareResult = password === user.password;
		if (compareResult) {
			res.status(200).json({
				token: generateToken(user._id),
				user,
			});
		} else {
			res.status(400).send('password does not match');
		}
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

const fetchUserData = async (req, res) => {
	try {
		let { id } = req.params;
		if (id === 'me') {
			id = req.user._id;
		}
		const data = await User.findById(id);
		data.password = undefined;
		return res.json({ data });
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

const getDoctorList = async (req, res) => {
	try {
		const doctors = await User.find({ role: 'doctor' });
		res.json(doctors);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

const getPatientList = async (req, res) => {
	try {
		const doctors = await User.find({ role: 'patient' });
		res.json(doctors);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

module.exports = {
	createUser,
	login,
	fetchUserData,
	getDoctorList,
	getPatientList
};
