const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const response = require('../helpers/response');
const User = require('../models/UserModel');

exports.register = [
  (req, res) => {
    try {
      User.findOne({ email: req.body.email })
        .then((user) => {
          if (user) {
            return response.validationResponse(
              res,
              `Email ${req.body.email} invalid`,
            );
          }

          bcrypt.hash(req.body.password, 10, (err, hash) => {
            const userStore = new User({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hash,
            });

            userStore
              .save()
              .then((user) => {
                return response.successResponse(
                  res,
                  {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                  },
                  'Registration success.',
                );
              })
              .catch((err) => {
                return response.errorResponse(res, err);
              });
          });
        })
        .catch((err) => {
          return response.errorResponse(res, err);
        });
    } catch (err) {
      return response.errorResponse(res, err);
    }
  },
];

exports.login = [
  (req, res) => {
    try {
      User.findOne({ email: req.body.email })
        .then((user) => {
          if (user) {
            bcrypt.compare(req.body.password, user.password, (err, same) => {
              if (same) {
                let userData = {
                  _id: user._id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                };

                userData.token = jwt.sign(userData, process.env.JWT_SECRET, {
                  expiresIn: process.env.JWT_TIMEOUT_DURATION,
                });

                return response.successResponse(
                  res,
                  userData,
                  'Login success.',
                );
              } else {
                return response.unauthorizedResponse(
                  res,
                  'Email or password wrong.',
                );
              }
            });
          } else {
            return response.unauthorizedResponse(
              res,
              'Email or password wrong.',
            );
          }
        })
        .catch((err) => {
          return response.errorResponse(res, err);
        });
    } catch (err) {
      return response.errorResponse(res, err);
    }
  },
];
