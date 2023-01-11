//imports
const express = require("express");
const router = express.Router();
const {
    checkData,
    register,
    getData,
    deleteEmployee,
    updateEmployee,
    updateCourse,
} = require("../controllers/employeeControllers");
const {
    checkLogin,
    employeeRegisterDataFilter,
} = require("../middlewares/common");

// Route handlers
router.post("/register", checkLogin, employeeRegisterDataFilter, register);
router.get("/getAll", getData);
router.post("/update", employeeRegisterDataFilter, updateEmployee);
router.post("/delete", deleteEmployee);
router.post("/check", checkData);
router.post("/updateCourse", updateCourse);

module.exports = router;
