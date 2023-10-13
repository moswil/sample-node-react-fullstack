const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: false,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	balance: {
		type: Number,
		required: true,
		default: 0.0,
	},
	created: {
		type: Date,
		default: Date.now,
	},
});

userSchema.pre('save', async function (next) {
	try {
		if (!this.isModified('password')) {
			return next();
		}
		// const hashed = await bcrypt.hash(this.password, 10);
		const hashed = this.password;
		this.password = hashed;
		return next();
	} catch (err) {
		return next(err);
	}
});

userSchema.methods.comparePassword = async function (attempt, next) {
	try {
		// return await bcrypt.compare(attempt, this.password);
		return attempt == this.password;
	} catch (err) {
		next(err);
	}
};

module.exports = mongoose.model('User', userSchema);
