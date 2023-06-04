const {
    GraphQLString,
    GraphQLList,
    GraphQLFloat,
    GraphQLObjectType,
} = require("graphql");
const { UserType, LoginType } = require("./typeDef");
const jwt = require("jsonwebtoken");
const db = require("../../models");
const minConfidence = 0.4;

module.exports = {
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

    getAllUser: {
        type: new GraphQLList(UserType),
        args: {},
        resolve: async (parent, args, context, info) => {
            const users = await db.User.findAll();
            return users;
        },
    },

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
};

// module.exports = { getUser, getAllUser, faceLogin };
