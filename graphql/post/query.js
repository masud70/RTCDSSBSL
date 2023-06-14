const { GraphQLInt, GraphQLList } = require("graphql");
const { PostType, PaginationType } = require("./typeDef");
const db = require("../../models");

module.exports = {
    getPosts: {
        type: new GraphQLList(PostType),
        args: {
            page: { type: GraphQLInt },
        },
        resolve: async (parent, args, ctx, info) => {
            const posts = await db.Post.findAll({
                offset: 5 * args.page,
                limit: 5,
                include: [
                    "User",
                    "Reactions",
                    {
                        model: db.Comment,
                        include: [db.User],
                        order: [["createdAt", "DESC"]],
                    },
                ],
                order: [["createdAt", "DESC"]],
            });
            return posts;
        },
    },

    getPagination: {
        type: PaginationType,
        args: {
            page: { type: GraphQLInt },
        },
        resolve: async (parent, args, ctx, info) => {
            const posts = await db.Post.findAll();
            const totalPost = posts.length;
            const totalPages = parseInt(totalPost / 5);

            const groupA = [];
            const groupB = [];

            let i = args.page;
            while (i > 1 && Math.abs(i - args.page) < 2 && i <= totalPages) {
                groupA.push(--i);
            }
            i = args.page;
            while (
                i < totalPages &&
                Math.abs(i - args.page) < 2 &&
                i < totalPages - 1
            ) {
                groupB.push(++i);
            }

            const pagination = {
                groupA: groupA.sort((a, b) => (a > b ? 1 : -1)),
                groupB: groupB.sort((a, b) => (a > b ? 1 : -1)),
                current:
                    args.page !== 0 && args.page !== totalPages
                        ? args.page
                        : null,
                end: totalPages,
            };
            return pagination;
        },
    },
};
