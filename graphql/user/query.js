const { GraphQLString, GraphQLList, GraphQLFloat } = require("graphql");
const { UserType, LoginType, CourseType } = require("./typeDef");
const jwt = require("jsonwebtoken");
const db = require("../../models");
const minConfidence = 0.4;

module.exports = {
    faceLogin: {
        type: LoginType,
        args: {
            phone: { type: GraphQLString },
            result: { type: GraphQLFloat },
        },
        resolve: async (parent, args, ctx, info) => {
            if (args.result < minConfidence) {
                return {
                    status: false,
                    message: "Authentication failed.",
                };
            }

            const user = await db.User.findOne({
                where: { phone: args.phone },
            });

            if (user) {
                const token = jwt.sign(
                    {
                        phone: args.phone,
                        userId: user.id,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "7d",
                    }
                );

                return {
                    status: true,
                    token: token,
                    message: "Authentication successful",
                    user: user,
                };
            }

            return {
                status: false,
                message: "Authentication failed.",
            };
        },
    },

    getUser: {
        type: UserType,
        args: {
            token: { type: GraphQLString },
        },
        resolve: async (parent, args, context, info) => {
            const decoded = jwt.verify(args.token, process.env.JWT_SECRET);
            const { userId } = decoded;
            console.log(userId);
            const user = await db.User.findOne({ where: { id: userId } });
            return user;
        },
    },

    getUserById: {
        type: UserType,
        args: {
            id: { type: GraphQLString },
        },
        resolve: async (parent, args, context, info) => {
            try {
                const user = await db.User.findOne({ where: { id: args.id } });
                return user;
            } catch (error) {
                return { status: false, message: error.message };
            }
        },
    },

    getAllUser: {
        type: new GraphQLList(UserType),
        args: {},
        resolve: async (parent, args, context, info) => {
            const users = await db.User.findAll({
                include: ["Course"],
                where: { status: true },
            });

            let ret = [];

            for (let i = 0; i < users.length; i++) {
                ret.push({ ...users[i].dataValues, slNo: i + 1 });
            }
            return ret;
        },
    },

    getCourseById: {
        type: CourseType,
        args: {
            UserId: { type: GraphQLString },
        },
        resolve: async (parent, args, ctx, info) => {
            const course = await db.Course.findOne({
                where: { UserId: args.UserId },
            });
            if (course)
                return {
                    status: true,
                    message: "Course found",
                    ...course.dataValues,
                };
            else
                return {
                    status: false,
                    message: "Course not found.",
                };
        },
    },
};
