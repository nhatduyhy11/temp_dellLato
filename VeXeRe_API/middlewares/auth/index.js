const jwt = require("jsonwebtoken");
const util = require("util");
const { JWT_SECRET_KEY } = require("../../config");

//Chuyển CB thành Promise
const jwtVerify = util.promisify(jwt.verify);

module.exports.authenticate = (req, res, next) => {
  const token = req.headers.token;

  jwtVerify(token, JWT_SECRET_KEY)
    .then((decoded) => {
      if (!decoded)
        return res.status(401).json({
          message: "Token is invalid",
        });

      // Decoded là payload
      req.user = decoded;
      return next();
    })
    .catch((err) => console.log(err));
};

// module.exports.authorize = (userTypeArray) => {
//   return (req, res, next) => {
//     const user = req.user;
//     if (userTypeArray.indexOf(user.userType) > -1) return next();

//     res.status(403).json({ message: "You do not have permission" });
//   };
// };

module.exports.authorize = (userTypeArray) => (req, res, next) => {
  const user = req.user;
  if (userTypeArray.indexOf(user.userType) > -1) return next();

  res.status(403).json({ message: "You do not have permission" });
};

//Authorization => role base access control
//passportjs
