const multer = require("multer");
const path = require("path");

module.exports = multer({
    limits: { fieldSize: 100 * 1024 * 1024 },
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname).toLowerCase();
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            // cb(new Error("Unsupported file type!"), false);
            console.log("Unsupported file type!")
            return;
        }
        cb(null, true);
    },
});