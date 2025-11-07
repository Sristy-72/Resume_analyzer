const multer = require("multer");

const storage = multer.memoryStorage(); // ✅ Store file in memory, not disk

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") cb(null, true);
  else cb(new Error("Only PDF files are allowed"), false);
};

exports.upload = multer({ storage, fileFilter });
