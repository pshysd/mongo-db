const express = require('express');
const User = require('../schemas/user');

const router = express.Router();

router.route('/').get(async (req, res, next) => {
	try {
		const users = await User.create({
			name: req.body.name,
			age: req.body.age,
			married: req.body.married,
		});
		console.log(user);
		res.status(201).json(user);
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.get('/:id/comments', async (req, res, next) => {
	try {
		const comments = await Comment.find({ commenter: req.params.id }).populate('commenter');
		console.log(comments);
		res.json(comments);
	} catch (error) {
		console.error(error);
		next(error);
	}
});

module.exports = router;
