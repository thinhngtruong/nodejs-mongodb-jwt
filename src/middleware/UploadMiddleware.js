const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const maxSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${crypto.randomBytes(3).toString('hex')}${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(new Error('File format should be PNG,JPG,JPEG'), false); // if validation failed then generate error
    }
  }
});

module.exports = upload;
