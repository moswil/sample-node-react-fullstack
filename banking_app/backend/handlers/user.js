const jwt = require('jsonwebtoken');

const db = require('../models');

exports.register = async (req, res, next) => {
	try {
		const user = await db.User.create(req.body);

		console.log(req.body);

		const { id, email } = user;

		const token = jwt.sign({ id, email }, process.env.SECRET);

		res.status(201).json({ id, email, token });
	} catch (err) {
		if (err.code === 11000) {
			err.message = 'Sorry, that email is already taken';
		}
		next(err);
	}
};

exports.login = async (req, res, next) => {
	try {
		const user = await db.User.findOne({ email: req.body.email });

		console.log(user);

		const { id, email } = user;
		const valid = await user.comparePassword(req.body.password);

		if (valid) {
			const token = jwt.sign({ id, email }, process.env.SECRET, {
				expiresIn: process.env.TOKEN_EXPIRY,
			});

			res.status(200).json({ id, email, token });
		} else {
			throw new Error('unable to sign token');
		}
	} catch (err) {
		err.message = 'Incorrect username or password';

		next(err);
	}
};
