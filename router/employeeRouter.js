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
    employeeRegisterDataFilter,
} = require("../middlewares/common/dataFilter");
const { checkUserExistence } = require("../middlewares/employeeMiddlewares");

// Route handlers
router.post(
    "/register",
    employeeRegisterDataFilter,
    checkUserExistence,
    register
);
router.get("/getAll", getData);
router.post("/update", employeeRegisterDataFilter, updateEmployee);
router.post("/delete", deleteEmployee);
router.post("/check", checkData);
router.post('/updateCourse', updateCourse)

module.exports = router;
