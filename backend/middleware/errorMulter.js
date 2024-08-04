
const multer = require('multer')
const uploadErrorHandler = (err, req, res, next) => {
  console.log(err,'ni err');
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  };
  
  module.exports = uploadErrorHandler;
  