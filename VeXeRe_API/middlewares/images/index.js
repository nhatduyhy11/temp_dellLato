const multer = require("multer");

//Type: avatar, coach
module.exports.uploadImage = (type) => {
  var storage = multer.diskStorage({
    // Nơi chứa hình ảnh
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/../../images/${type}s`);
    },
    filename: function (req, file, cb) {
      console.log(file);
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage });
  // MDW (req, res, next)
  return upload.single(type);
};
