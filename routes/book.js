const express = require('express');

const router = express.Router();

const BookController = require('../controllers/BookController');

router.get('/', BookController.bookList);
router.get('/:id', BookController.bookDetail);
router.post('/', BookController.bookStore);
router.put('/:id', BookController.bookUpdate);
router.delete('/:id', BookController.bookDelete);

module.exports = router;
