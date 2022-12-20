//imports
const express = require("express");
const router = express.Router();
const {
    checkData,
    register,
    getData,
} = require("../controllers/employeeControllers");
const { employeeRegisterDataFilter } = require("../middlewares/common/dataFilter");
const { checkUserExistence } = require("../middlewares/employeeMiddlewares");

// Route handlers
router.post("/register", employeeRegisterDataFilter, checkUserExistence, register);
router.get("/getAll", getData);
router.post("/check", checkData);

module.exports = router;
