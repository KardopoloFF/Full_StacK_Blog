const { body } = require('express-validator');

const regValidation = [
	body('email', 'Неверный формат электронной почты').isEmail(),
	body('password', 'Задайте пароль (мин. 5 символов)').isLength({ min: 5 }),
	body('name', 'Введите имя').isLength({ min: 3 }),
	body('avatar').optional().isURL(),
];

module.exports = regValidation;
