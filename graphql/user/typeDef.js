const { GraphQLObjectType, GraphQLString } = require("graphql");

const UserType = new GraphQLObjectType({
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
});

module.exports = UserType;
