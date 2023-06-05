const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require("graphql");
const { UserType } = require("../user/typeDef");

module.exports = {
    SmsType: new GraphQLObjectType({
        name: "Sms",
        fields: () => ({
            id: { type: GraphQLString },
            phone: { type: GraphQLString },
            body: { type: GraphQLString },
            time: { type: GraphQLString },
            sentBy: { type: GraphQLString },
            message: { type: GraphQLString },
            status: { type: GraphQLBoolean },
            User: { type: UserType },
        }),
    }),
};
