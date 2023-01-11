const User = require("../mongoModels/People");

module.exports = {
    checkUserExistence: (req, res, next) => {
        const { mobile } = req.body;

        User.findOne({ mobile: mobile }).then((response) => {
            console.log(response);
            if (response) {
                res.json({ status: false, message: "User already exists" });
            } else {
                next();
            }
        });
    },
};
