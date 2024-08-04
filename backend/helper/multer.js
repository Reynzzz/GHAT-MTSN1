const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|heic/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});

const compressImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const { path: tempPath, filename } = req.file;
    const compressedPath = `uploads/compressed-${filename}`;

    await sharp(tempPath)
      .resize({ width: 800 }) 
      .toFile(compressedPath);

    // Ensure temp file deletion is logged and handled properly
    try {
      fs.unlinkSync(tempPath);
      console.log(`Deleted temporary file: ${tempPath}`);
    } catch (unlinkError) {
      console.error(`Error deleting file: ${unlinkError.message}`);
    }

    req.file.path = compressedPath;
    req.file.filename = `compressed-${filename}`;

    next();
  } catch (error) {
    console.error(`Error during image compression: ${error.message}`);
    next(error); // Propagate the error to Express error handling middleware
  }
};

module.exports = { upload, compressImage };
