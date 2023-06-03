const { GraphQLString } = require("graphql");
const UserType = require("./typeDef");
const bcrypt = require('bcrypt');
const db = require("../../models");

const createUser = {
    type: UserType,
    args: {
        id: { type: GraphQLString },
        nameBn: { type: GraphQLString },
        nameEn: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        designation: { type: GraphQLString },
        currentOffice: { type: GraphQLString },
        dob: { type: GraphQLString },
        currentOfficeJoinDate: { type: GraphQLString },
        dateOfPRL: { type: GraphQLString },
    },
    resolve: async (parent, args, context, info) => {
        args.password = bcrypt.hashSync("User@123", 10);
        const user = await db.User.create(args);
        return user;
    },
};

module.exports = {
    createUser,
};
