import express from "express"
import homeController from "../controllers/homeController"
import multer from "multer"
import path from "path"

var appRoot = require('app-root-path')
let router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/img/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });
let upload1 = multer({ storage: storage, fileFilter: imageFilter }).array('multi', 3);


const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage)
    router.get('/detail/user/:id', homeController.getDetailPage)
    router.get('/update/user/:id', homeController.updateUserPage)
    router.get('/uploadFile', homeController.getUploadFile)
    router.post('/create-new-user', homeController.createNewUser)
    router.post('/delete-user', homeController.deleteUser)
    router.post('/update-user', homeController.updateUser)
    router.post('/upload-profile-pic', upload.single('single'), homeController.handleUploadFile)
    router.post('/upload-profile-pics', (req, res, next) => {
        upload1(req, res, (err) => {
            if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
                res.send("LIMIT_UNEXPECTED_FILE")
            } else if (err) {
                res.send(err)
            } else {
                next();
            }
        })
    }
        , homeController.handleUploadFiles)

    return app.use('/', router)
}

export default initWebRoute