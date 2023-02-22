const express = require('express');
const multer = require('multer');
const checkAuth = require('../../utils/checkAuth');

const imageRouter = express.Router();

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, './images');
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

imageRouter.post('/', checkAuth, upload.single('image'), (req, res) => {
	res.json({
		url: `../images/${req.file.originalname}`,
	});
});

module.exports = imageRouter;
