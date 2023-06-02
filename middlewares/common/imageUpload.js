const fs = require("fs");
const multer = require("multer");
const path = require("path");

// storage definition
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.IMG_UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    },
});

//prepare final multer upload object
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 2000000,
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(new Error("Only .jpg, .png or .jpeg formats are allowed!"));
        }
    },
});

const updateDatabase = async (req, res, next) => {
    const user = await req.db.User.findOne({
        where: { phone: req.auth.phone },
    });

    try {
        if (user.avatar) {
            const filePath = user.avatar.replace(
                process.env.BASE_URL,
                ".\\public"
            );
            console.log(filePath);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err.message);
                    return;
                }
                console.log("Existing file deleted.");
            });
        }
    } catch (error) {
        console.log(error);
    }

    const updatedFilePath =
        process.env.BASE_URL + req.file.path.replace("public", "");
    req.db.User.update(
        { avatar: updatedFilePath },
        { where: { id: req.auth.userId } }
    )
        .then((data) => {
            res.json({
                status: true,
                message: "Upload successful!",
                path: updatedFilePath,
            });
        })
        .catch((error) => {
            next(error.message);
        });
};

module.exports = { upload, updateDatabase };
