const mongoose = require('mongoose');

const response = require('../helpers/response');
const authenticate = require('../middlewares/jwt');
const Book = require('../models/BookModel');

exports.bookList = [
  authenticate,
  (req, res) => {
    try {
      Book.find()
        .then((books) => {
          return response.successResponse(res, books);
        })
        .catch((err) => {
          return response.errorResponse(res, err.message);
        });
    } catch (err) {
      return response.errorResponse(res, err);
    }
  },
];

exports.bookDetail = [
  authenticate,
  (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return response.validationResponse(
          res,
          `Book id ${req.params.id} invalid`,
        );
      }

      Book.findOne({ _id: req.params.id })
        .then((book) => {
          if (book !== null) {
            return response.successResponse(res, new Book(book));
          }

          return response.successResponse(res);
        })
        .catch((err) => {
          return response.errorResponse(res, err);
        });
    } catch (err) {
      return response.errorResponse(res, err);
    }
  },
];

exports.bookStore = [
  authenticate,
  (req, res) => {
    try {
      const bookStore = new Book({
        title: req.body.title,
        description: req.body.description,
        isbn: req.body.isbn,
      });

      bookStore
        .save()
        .then((book) => {
          return response.successResponse(res, book);
        })
        .catch((err) => {
          return response.errorResponse(res, err);
        });
    } catch (err) {
      return response.errorResponse(res, err);
    }
  },
];

exports.bookUpdate = [
  authenticate,
  (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return response.validationResponse(
          res,
          `Book id ${req.params.id} invalid`,
        );
      }

      const bookUpdate = new Book({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        isbn: req.body.isbn,
      });

      Book.findById(req.params.id, (err, book) => {
        if (err) {
          return response.notFoundResponse(
            res,
            `Book id ${req.params.id} not exists`,
          );
        }

        Book.findByIdAndUpdate(req.params.id, bookUpdate, {}, (err) => {
          if (err) {
            return response.errorResponse(res, err);
          }

          return response.successResponse(res, new Book(bookUpdate));
        });
      });
    } catch (err) {
      return response.errorResponse(res, err);
    }
  },
];

exports.bookDelete = [
  authenticate,
  (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return response.validationResponse(
          res,
          `Book id ${req.params.id} invalid`,
        );
      }

      Book.findById(req.params.id, (err, book) => {
        if (err) {
          return response.notFoundResponse(
            res,
            `Book id ${req.params.id} not exists`,
          );
        }

        Book.findByIdAndRemove(req.params.id, (err) => {
          if (err) {
            return response.errorResponse(res, err);
          }

          return response.successResponse(res);
        });
      });
    } catch (err) {
      return response.errorResponse(res, err);
    }
  },
];
