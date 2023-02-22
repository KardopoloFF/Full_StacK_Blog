const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

	if (token) {
		try {
			const decoded = jwt.verify(token, 'coffeeWeLike');
			req.id = decoded._id;
			next();
		} catch (error) {
			console.log(error);
			return res.status(403).json({
				message: 'forbidden',
			});
		}
	} else {
		return res.status(403).json({
			message: 'forbidden',
		});
	}
};

module.exports = checkAuth;
