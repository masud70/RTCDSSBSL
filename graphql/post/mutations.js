const { GraphQLString } = require("graphql");
const bcrypt = require("bcrypt");
const db = require("../../models");
const { PostType } = require("./typeDef");

module.exports = {
    createUser: {
        type: PostType,
        args: {
            body: { type: GraphQLString },
            token: { type: GraphQLString },
        },
        resolve: async (parent, args, context, info) => {
            args.password = bcrypt.hashSync("User@123", 10);
            const user = await db.User.create(args);
            return user;
        },
    },
};
