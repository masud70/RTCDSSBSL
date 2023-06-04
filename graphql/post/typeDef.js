const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
} = require("graphql");
const { UserType } = require("../user/typeDef");

module.exports = {
    PostType: new GraphQLObjectType({
        name: "Post",
        fields: () => ({
            id: { type: GraphQLString },
            body: { type: GraphQLString },
            time: { type: GraphQLString },
            createdAt: { type: GraphQLString },
            updatedAt: { type: GraphQLString },
            UserId: { type: GraphQLString },
            User: { type: UserType },
            Comments: { type: new GraphQLList(module.exports.CommentType) },
            Reactions: { type: new GraphQLList(module.exports.ReactionType) },
        }),
    }),

    CommentType: new GraphQLObjectType({
        name: "Comment",
        fields: () => ({
            id: { type: GraphQLString },
            postId: { type: GraphQLString },
            body: { type: GraphQLString },
            time: { type: GraphQLString },
            UserId: { type: GraphQLString },
            User: { type: UserType },
        }),
    }),

    ReactionType: new GraphQLObjectType({
        name: "Reaction",
        fields: () => ({
            id: { type: GraphQLString },
            postId: { type: GraphQLString },
            type: { type: GraphQLString },
            UserId: { type: GraphQLString },
        }),
    }),

    PaginationType: new GraphQLObjectType({
        name: "Pagination",
        fields: () => ({
            groupA: { type: GraphQLList(GraphQLInt) },
            groupB: { type: GraphQLList(GraphQLInt) },
            current: { type: GraphQLInt },
            end: { type: GraphQLInt },
        }),
    }),
};
