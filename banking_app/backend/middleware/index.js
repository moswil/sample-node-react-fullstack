const jwt = require('jsonwebtoken');

exports.authMiddleware = async (req, res, next) => {
	const token = req.header('Authorization');

	if (!token) return res.status(401).json({ message: 'Authentication Failed' });
	try {
		const val = jwt.verify(token, process.env.SECRET);
		req.user = val;
		next();
	} catch (e) {
		console.error(e);
		res.status(500).send({ message: 'Token Invalid' });
	}
};
