const express = require('express');
const { Post, User } = require('../../db/models');
const checkAuth = require('../../utils/checkAuth');
const handleErrors = require('../../utils/handleErrors');
const postCreateValidation = require('../../validations/post');

const postRouter = express.Router();

postRouter.get('/', async (req, res) => {
	try {
		const posts = await Post.findAll({ include: { model: User } });
		res.json(posts);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось загрузить посты',
		});
	}
});

postRouter.get('/tags', async (req, res) => {
	try {
		const posts = await Post.findAll({ limit: 5 });

		const tags = posts.map((obj) => obj.tags).flat().slice(0, 5);

		res.json(tags);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось загрузить теги',
		});
	}
});

postRouter.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const onePost = await Post.findOne({ where: { id } });
		const incrementView = await onePost.increment('viewCount', { by: 1 });

		res.json(onePost);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось загрузить пост',
		});
	}
});

postRouter.post('/', checkAuth, postCreateValidation, handleErrors, async (req, res) => {
	try {
		const {
			user_id,
			title, text, tags, imageUrl, viewCount,
		} = req.body;

		const post = await Post.create({
			user_id: req.id, title, text, tags, imageUrl, viewCount: 0,
		});
		res.json(post);
	} catch (error) {
		console.log(error);
	}
});

postRouter.delete('/:id', checkAuth, async (req, res) => {
	try {
		const { id } = req.params;
		await Post.destroy({ where: { id } });
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось удалить пост',
		});
	}
});

postRouter.patch('/:id', checkAuth, handleErrors, async (req, res) => {
	try {
		const {
			user_id,
			title, text, tags, imageUrl, viewCount,
		} = req.body;

		const { id } = req.params;

		await Post.update({
			user_id, title, text, tags, imageUrl, viewCount,
		}, { where: { id } });
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось отредактировать пост',
		});
	}
});

module.exports = postRouter;
