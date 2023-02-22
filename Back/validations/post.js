const { body } = require('express-validator');

const postCreateValidation = [
	body('title', 'Введите заголовок новой статьи').isLength({ min: 3 }).isString(),
	body('text', 'Статья должна включать в себя текст (мин. 10 символов)').isLength({ min: 10 }).isString(),
	body('tags', 'Неверный формат тегов').optional().isArray(),
	body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];

module.exports = postCreateValidation;
