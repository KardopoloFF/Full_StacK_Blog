const express = require('express');
const cors = require('cors');
const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');
const imageRouter = require('./routes/imageRouter');

require('dotenv').config();

const app = express();

app.use(cors({
	credentials: true,
	origin: true,
}));

const PORT = process.env.PORT || 4445;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', userRouter);
app.use('/post', postRouter);
app.use('/upload', imageRouter);
app.use('/uploads', express.static('images'));

app.listen(PORT, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log(`Server started on port ${PORT}`);
	}
});
