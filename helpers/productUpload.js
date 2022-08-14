const multer = require('multer');
const path = require('path');

// Set Storage Engine
const storage1 = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/images/');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

// Check File Type 
function checkFileType(file, callback) {
    // Allowed file extensions 
    const filetypes = /jpeg|jpg|png|gif|jfif/;
    // Test extension 
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Test mime 
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return callback(null, true);
    }
    else {
        callback({ message: 'Images Only' });
    }
}

// Define Upload Function
const upload1 = multer({
    storage: storage1,
    limits: { fileSize: 2000000 }, // 1MB
    fileFilter: (req, file, callback) => {
    checkFileType(file, callback);
    }
    }).single('image'); // Must be the name as the HTML file upload input 

module.exports = upload1;