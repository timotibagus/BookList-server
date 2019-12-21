const express = require('express');
const router = express.Router();
const Book = require('../models/book.model');

router.get('/', async (req, res) => {
	try {
		await Book.find().then((data) => res.json(data));
	} catch (err) {
		res.json(err);
	}
});

router.post('/', async (req, res) => {
	const { title, description, publisher } = req.body;
	const book = new Book({
		title,
		description,
		publisher
	});
	try {
		const savedBook = await book.save();
		res.json(savedBook);
	} catch (err) {
		res.json((err) => console.log(err));
	}
});

router.get('/:id', async (req, res) => {
	try {
		await Book.findById(req.params.id).then((data) => res.json(data));
	} catch (err) {
		res.json(err);
	}
});

module.exports = router;
