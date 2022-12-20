const User = require("../../models/People");

module.exports = {
    dataChecker: async (data) => {
        try {
            let user;
            switch (data.type) {
                case "nameBn":
                    user = await User.find({ nameBn: data.value });
                    break;
                case "nameEn":
                    user = await User.find({ nameEn: data.value });
                    break;
                case "email":
                    user = await User.find({ email: data.value });
                    break;
                default:
                    break;
            }

            let result = {};
            if (user && user.length > 0) {
                result.status = true;
                result.message = data.type + " already exists";
            } else {
                result.status = false;
                result.message = data.type + " does not exist";
            }
            return result;
        } catch (error) {
            return { status: true, message: "There was an error" };
        }
    },
};
