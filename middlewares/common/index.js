const createError = require("http-errors");
const jwt = require("jsonwebtoken");

module.exports = {
    checkLogin: (req, res, next) => {
        const { authorization } = req.headers;
        try {
            const token = authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const { phone, userId } = decoded;
            req.body.auth = { phone, userId };
            next();
        } catch (err) {
            next("Authentication failed!");
        }
    },

    employeeRegisterDataFilter: (req, res, next) => {
        const user = req.body;
        try {
            user.phone = user.phone.replace("+88", "");
            req.body = user;
            next();
        } catch (error) {
            next("There was an error. Please try again.");
        }
    },

    //404 handler
    notFoundHandler: (req, res, next) => {
        next(createError(404, "Your requested content was not found."));
    },

    //default errorHandler
    errorHandler: (err, req, res, next) => {
        console.log("Error:", err);
        res.json({
            status: false,
            message: err,
        });
    },
};
