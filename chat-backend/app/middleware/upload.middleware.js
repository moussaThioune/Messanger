const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

function checkFileType(file, cb) {
    if (file.fieldname === "pdf") { // if uploading document pdf
        if (
            file.mimetype === 'application/pdf' ||
            file.mimetype === 'application/msword' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) { // check file type to be pdf, doc, or docx
            cb(null, true);
        } else {
            cb(null, false); // else fails
        }
    } else { // else uploading image
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'||
            file.mimetype === 'image/svg+xml'
        ) { // check file type to be png, jpeg, jpg or svg
            cb(null, true);
        } else {
            cb(null, false); // else fails
        }
    }
}
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "image") { // if uploading image
            cb(null, __basedir + "/public/uploads/images");
        } else { // else uploading pdf
            cb(null, __basedir + "/public/uploads/pdf");
        }
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname);
    },
});

const uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).fields(
    [
        {
            name:'image', maxCount:1
        },
        {
            name:'pdf', maxCount:1
        }
    ]
);

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;