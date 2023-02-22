const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { hash, compare } = require('bcrypt');
const regValidation = require('../../validations/auth');
const { User } = require('../../db/models');
const checkAuth = require('../../utils/checkAuth');
const handleErrors = require('../../utils/handleErrors');

const userRouter = express.Router();

userRouter.use(cors({
	credentials: true,
	origin: true,
}));

userRouter.post('/login', handleErrors, async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
		const user = await User.findOne({ where: { email } });
		if (!user) return res.status(400).json({ message: 'Неверный логин или пароль' });

		const isPassValid = await compare(password, user.password);
		if (!isPassValid) return res.status(404).json({ message: 'Неверный логин или пароль' });

		const token = jwt.sign(
			{
				_id: user.id,
			},
			'coffeeWeLike',
			{
				expiresIn: '30d',
			},
		);

		res.json({
			...user,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось авторизоваться',
		});
	}
});

// registration
userRouter.post('/reg', regValidation, handleErrors, async (req, res) => {
	try {
		const {
			name, email, password,
		} = req.body;

		const hashPassword = await hash(password, 10);

		const [user, isCreated] = await User.findOrCreate({
			where: { email },
			defaults: {
				name, email, password: hashPassword, avatar: 'default_avatar.jpg',
			},
		});

		if (!isCreated) return res.status(400).json({ message: 'Такой пользователь уже зарегистрирован.' });

		const token = jwt.sign(
			{
				id: user.id,
			},
			'coffeeWeLike',
			{
				expiresIn: '30d',
			},
		);

		res.json({
			...user,
			token,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не удалось зарегистрироваться',
		});
	}
});

userRouter.get('/check', checkAuth, async (req, res) => {
	const user = await User.findByPk(req.id);
	try {
		if (!user) {
			return res.status(404).json({
				message: 'Не авторизован',
			});
		}
		res.json(user);
	} catch (error) {
		console.log(error);
	}
});

module.exports = userRouter;
