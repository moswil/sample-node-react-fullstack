const db = require('../models');

async function getCurrentUser(req) {
	console.log(req.user);
	try {
		return await db.User.findById(req.user.id);
	} catch (e) {
		throw new Error(`error fetching user: ${e}`);
	}
}

exports.getAllAccounts = async (req, res, next) => {
	try {
		const users = await db.User.find({});
		res.status(200).json({ users });
	} catch (err) {
		console.log(`error occurred getting users: ${err}`);

		next(err);
	}
};

exports.getBalance = async (req, res, next) => {
	try {
		const user = await getCurrentUser(req);

		res.status(200).json({ email: user.email, balance: user.balance });
	} catch (err) {
		console.log(`error occurred getting balance: ${err}`);

		next(err);
	}
};

exports.withdraw = async (req, res, next) => {
	try {
		const user = await getCurrentUser(req);

		// withdraw amount
		const withdrawAmount = Number(req.body.withdrawAmount);

		// check if the balance is greater than the withdraw amount
		if (user.balance >= withdrawAmount) {
			// process withdraw
			const updated = await db.User.findById(user.id);
			const currentBal = updated.balance;
			updated.balance = currentBal - withdrawAmount;
			await updated.save();
			res.status(200).json({ balance: updated.balance });
		} else {
			// reject withdraw
			res
				.status(400)
				.json({ error: "insufficient balance, can't make a withdraw" });
		}
	} catch (err) {
		console.log(`error withdrawing: ${err}`);

		next(err);
	}
};

exports.deposit = async (req, res, next) => {
	try {
		const user = await getCurrentUser(req);

		// deposit amount
		const depositAmount = Number(req.body.depositAmount);

		// process deposit
		if (depositAmount < 0) {
			res.status(400).json({ error: "can't deposit less than 0" });
		}
		const updated = await db.User.findById(user.id);
		const currentBal = updated.balance;
		updated.balance = currentBal + depositAmount;
		console.log({ updated });
		await updated.save();
		res.status(200).json({ balance: updated.balance });
	} catch (err) {
		console.log(`error depositing: ${err}`);

		next(err);
	}
};
