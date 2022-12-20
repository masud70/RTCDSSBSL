module.exports = {
    employeeRegisterDataFilter: (req, res, next) => {
        const user = req.body;
        user.mobile = user.mobile.replace("+88", "");
        if (!user.avatar || user.avatar === "") {
            user.avatar = "https://www.gravatar.com/avatar/";
        }
        req.body = user;
        next();
    },
};
