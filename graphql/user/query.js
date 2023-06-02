const { GraphQLString, GraphQLList } = require("graphql");
const UserType = require("./typeDef");
const jwt = require('jsonwebtoken');
const db = require("../../models");

const getUser = {
    type: UserType,
    args: {
        token: { type: GraphQLString },
    },
    resolve: async (parent, args, context, info) => {
        const decoded = jwt.verify(args.token, process.env.JWT_SECRET);
        const { userId } = decoded;
        console.log(userId)
        const user = await db.User.findOne({ where: { id: userId } });
        return user;
    },
};

const getAllUser = {
    type: new GraphQLList(UserType),
    args: {},
    resolve: async (parent, args, context, info) => {
        const users = await db.User.findAll();
        return users;
    },
};

module.exports = { getUser, getAllUser };
