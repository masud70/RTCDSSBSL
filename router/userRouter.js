//imports
const express = require("express");
const {
    registerValidator,
    registerValidationHandler,
} = require("../middlewares/users/registerValidator");
const {
    registerController,
    loginController,
    getDataController,
    checkPhone,
    checkMail,
    verifyOtp,
    ratingHandler,
    getRating,
} = require("../controllers/userController");
const { checkLogin } = require("../middlewares/common");

const router = express.Router();

//login api
router.post(
    "/register",
    registerValidator,
    registerValidationHandler,
    registerController
);

router.post("/login", loginController);
router.get("/getData", checkLogin, getDataController);
router.get("/checkPhone/:phone", checkPhone);
router.get("/checkMail/:email", checkMail);
router.get("/verifyOtp/:data", verifyOtp);
router.get("/rate/:rate", checkLogin, ratingHandler);
router.get("/getRate", getRating);

module.exports = router;
