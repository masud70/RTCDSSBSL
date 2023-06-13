const { GraphQLString } = require("graphql");
const { UserType, CourseType } = require("./typeDef");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../../models");

module.exports = {
    createUser: {
        type: UserType,
        args: {
            nameBn: { type: GraphQLString },
            nameEn: { type: GraphQLString },
            email: { type: GraphQLString },
            phone: { type: GraphQLString },
            designation: { type: GraphQLString },
            currentOffice: { type: GraphQLString },
            dob: { type: GraphQLString },
            currentOfficeJoinDate: { type: GraphQLString },
            dateOfPRL: { type: GraphQLString },
            token: { type: GraphQLString },
        },
        resolve: async (parent, args, context, info) => {
            try {
                args.password = bcrypt.hashSync("User@123", 10);
                const user = await db.User.create({
                    ...args,
                    avatar: "http://localhost:5000/uploads/images/profile.png",
                });
                if (user)
                    return {
                        status: true,
                        message: "Employee added successfully!",
                        ...user.dataValues,
                    };
                else
                    return {
                        status: false,
                        message: "User cannot be created.",
                    };
            } catch (error) {
                return {
                    status: false,
                    message: error.message,
                };
            }
        },
    },

    insertOrUpdateCourse: {
        type: CourseType,
        args: {
            UserId: { type: GraphQLString },
            courseName: { type: GraphQLString },
            startDate: { type: GraphQLString },
            endDate: { type: GraphQLString },
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const user = await db.User.findOne({
                    where: { id: args.UserId },
                    include: ["Course"],
                });

                if (user && user.Course) {
                    const courseUpdated = await db.Course.update(
                        {
                            courseName: args.courseName,
                            startDate: args.startDate,
                            endDate: args.endDate,
                        },
                        {
                            where: { id: user.Course.id },
                            returning: true,
                            plain: true,
                        }
                    );
                    console.log(courseUpdated);
                    return {
                        status: true,
                        message: "Course updated successfully!",
                    };
                } else if (user) {
                    const courseNew = await db.Course.create({
                        courseName: args.courseName,
                        startDate: args.startDate,
                        endDate: args.endDate,
                        UserId: args.UserId,
                    });
                    console.log(courseNew);
                    return {
                        status: true,
                        message: "Course added successfully!",
                        ...courseNew,
                    };
                }
            } catch (error) {
                return {
                    status: false,
                    message: error.message,
                };
            }
        },
    },

    updateUser: {
        type: UserType,
        args: {
            nameBn: { type: GraphQLString },
            nameEn: { type: GraphQLString },
            email: { type: GraphQLString },
            phone: { type: GraphQLString },
            designation: { type: GraphQLString },
            currentOffice: { type: GraphQLString },
            dob: { type: GraphQLString },
            currentOfficeJoinDate: { type: GraphQLString },
            dateOfPRL: { type: GraphQLString },
            id: { type: GraphQLString },
            token: { type: GraphQLString },
        },
        resolve: async (parent, args, ctx, info) => {
            console.log(args);
            try {
                const { userId } = jwt.verify(
                    args.token,
                    process.env.JWT_SECRET
                );
                if (userId) {
                    const update = await db.User.update(
                        {
                            nameBn: args.nameBn,
                            nameEn: args.nameEn,
                            email: args.email,
                            phone: args.phone,
                            designation: args.designation,
                            currentOffice: args.currentOffice,
                            dob: args.dob,
                            currentOfficeJoinDate: args.currentOfficeJoinDate,
                            dateOfPRL: args.dateOfPRL,
                        },
                        { where: { id: args.id } }
                    );
                    if (update[0]) {
                        return {
                            status: true,
                            message: "User updated.",
                        };
                    } else {
                        throw new Error("Update failed.");
                    }
                } else {
                    throw new Error("Invalid token.");
                }
            } catch (error) {
                return { status: false, message: error.message };
            }
        },
    },

    deleteUser: {
        type: UserType,
        args: {
            id: { type: GraphQLString },
            token: { type: GraphQLString },
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const deleted = await db.User.destroy({
                    where: { id: args.id },
                });
                console.log(deleted);

                return {
                    status: true,
                    message: "User deleted successfully.",
                };
            } catch (error) {
                return { status: false, message: error.message };
            }
        },
    },
};
