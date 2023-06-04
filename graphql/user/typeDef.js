const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require("graphql");

module.exports = {
    UserType: new GraphQLObjectType({
        name: "User",
        fields: () => ({
            id: { type: GraphQLString },
            nameBn: { type: GraphQLString },
            nameEn: { type: GraphQLString },
            email: { type: GraphQLString },
            phone: { type: GraphQLString },
            designation: { type: GraphQLString },
            currentOffice: { type: GraphQLString },
            dob: { type: GraphQLString },
            avatar: { type: GraphQLString },
            currentOfficeJoinDate: { type: GraphQLString },
            dateOfPRL: { type: GraphQLString },
        }),
    }),

    LoginType: new GraphQLObjectType({
        name: "Login",
        fields: () => ({
            token: { type: GraphQLString },
            status: { type: GraphQLBoolean },
            message: { type: GraphQLString },
            user: { type: module.exports.UserType },
        }),
    }),
};
