const { GraphQLString } = require("graphql");
const { SmsType } = require("./typeDef");

module.exports = {
    sendSms: {
        type: SmsType,
        args: {
            token: { type: GraphQLString },
            phone: { type: GraphQLString },
            body: { type: GraphQLString },
        },
        resolve: (parent, args, ctx, info) => {
            return args;
        },
    },
};
