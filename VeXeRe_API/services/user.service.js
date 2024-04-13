const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util"); //Build in NodeJS
const { JWT_SECRET_KEY } = require("../config");

const jwtSign = util.promisify(jwt.sign);

module.exports.createUser = (req, res, next) => {
  const { email, password, fullName, userType } = req.body;

  //Validate email

  User.create({ email, password, fullName })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => res.status(500).json(err));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let _user;

  User.findOne({ email })
    .then((user) => {
      if (!user)
        return Promise.reject({ status: 404, messages: "User Not Found" });
      _user = user;

      return bcrypt.compare(password, user.password);
    })
    .then((isMatched) => {
      if (!isMatched)
        return Promise.reject({
          status: 400,
          message: "Password Incorrect",
        });

      const payload = {
        _id: _user._id,
        email: _user.email,
        fullName: _user.fullName,
        userType: _user.userType,
      };

      // Tham số thứ 2 là scret key
      return jwtSign(payload, JWT_SECRET_KEY, { expiresIn: "1h" });
    })
    .then((token) => {
      return res.status(200).json({
        message: "Login Successfully",
        token,
      });
    })
    .catch((err) => res.json(err));
};

module.exports.updatePassword = (req, res, next) => {
  const { email, oldPassword, newPassword } = req.body;
  let _user;

  User.findOne({ email })
    .then((user) => {
      if (!user)
        return Promise.reject({ status: 404, messages: "User Not Found" });
      _user = user;

      return bcrypt.compare(oldPassword, user.password);
    })
    .then((isMatched) => {
      if (!isMatched)
        return Promise.reject({
          status: 400,
          message: "Password Incorrect",
        });

      _user.password = newPassword;
      return _user.save();
    })
    .then(() => res.status(200).json({ message: "Update Successfully" }))

    .catch((err) => res.json(err));
};

module.exports.getMe = (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports.uploadAvatar = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user)
        return Promise.reject({
          message: "User Not Found",
        });

      user.avatarUrl = `${req.file.fieldname}s/${req.file.filename}`;
      return user.save();
    })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => console.log(err));
};
