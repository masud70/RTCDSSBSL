module.exports = {
    getAllPost: async (req, res, next) => {
        try {
            const posts = await req.db.Post.findAll({
                include: [
                    {
                        association: "User",
                        attributes: [
                            "nameBn",
                            "nameEn",
                            "email",
                            "designation",
                            "avatar",
                        ],
                    },
                ],
                order: [["createdAt", "DESC"]],
            });

            let ret = [];

            for (let idx = 0; idx < posts.length; idx++) {
                const comments = await req.db.Comment.findAll({
                    where: { PostId: posts[idx].id },
                    order: [["createdAt", "DESC"]],
                });
                const { count, rows } = await req.db.Reaction.findAndCountAll({
                    where: { PostId: posts[idx].id },
                });
                const cmnts = { comments: comments };
                const reactions = { reactions: rows };
                ret.push({ ...posts[idx].dataValues, ...cmnts, ...reactions });
            }
            res.json({
                status: true,
                data: ret,
            });
        } catch (error) {
            next(error);
        }
    },

    // ============================================================== //
    createPost: (req, res, next) => {
        const data = req.body;
        req.db.Post.create(
            {
                body: data.body,
                time: data.time,
                UserId: data.auth.userId,
            },
            { fields: ["body", "time", "UserId"] }
        )
            .then((resp) => {
                if (resp) {
                    res.json({
                        status: true,
                        data: resp,
                        message: "Post added successfully.",
                    });
                } else {
                    next("There was an error creating the post.");
                }
            })
            .catch((err) => {
                next(err.message);
            });
    },

    getAllPost2: async (req, res, next) => {
        try {
            const posts = await req.db.Post.findAll({
                include: [
                    {
                        association: "User",
                        attributes: [
                            "nameBn",
                            "nameEn",
                            "email",
                            "designation",
                            "avatar",
                        ],
                    },
                ],
                order: [["createdAt", "DESC"]],
            });

            let ret = [];

            for (let idx = 0; idx < posts.length; idx++) {
                const comments = await req.db.Comment.findAll({
                    where: { PostId: posts[idx].id },
                    order: [["createdAt", "DESC"]],
                });
                const { count, rows } = await req.db.Reaction.findAndCountAll({
                    where: { PostId: posts[idx].id },
                    group: ["type"],
                });
                const cmnts = { comments: comments };
                const reactions = { reactions: rows };
                ret.push({ ...posts[idx].dataValues, ...cmnts, ...reactions });
            }
            res.json({
                status: true,
                data: ret,
            });
        } catch (error) {
            next(error.message);
        }
    },

    getSinglePostById: async (req, res, next) => {
        const id = req.params.id;
        try {
            const post = await req.db.Post.findByPk(id, {
                include: [
                    {
                        association: "User",
                        attributes: [
                            "nameBn",
                            "nameEn",
                            "email",
                            "designation",
                            "avatar",
                        ],
                    },
                ],
                order: [["createdAt", "DESC"]],
            });

            let ret = [];

            const comments = await req.db.Comment.findAll({
                where: { PostId: id },
            });
            const cmnts = { comments: comments };
            ret.push({ ...post.dataValues, ...cmnts });

            // for (let idx = 0; idx < posts.length; idx++) {
            //     const comments = await req.db.Comment.findAll({
            //         where: { PostId: posts[idx].id },
            //     });
            //     const cmnts = { comments: comments };
            //     ret.push({ ...posts[idx].dataValues, ...cmnts });
            // }
            res.json({
                status: true,
                data: ret,
            });
        } catch (error) {
            next(error);
        }
    },

    postComment: (req, res, next) => {
        const data = req.body;
        console.log(data);
        req.db.Comment.create(
            {
                body: data.commentBody,
                time: data.commentTime,
                UserId: data.auth.userId,
                PostId: data.postId,
            },
            { fields: ["body", "time", "UserId", "PostId"] }
        )
            .then((resp) => {
                if (resp) {
                    req.io.emit("updatePost", resp);
                    res.json({
                        status: true,
                        data: resp,
                        message: "Comment added successfully.",
                    });
                } else next("There was an error. Please try again.");
            })
            .catch((error) => next(error));
    },

    reactionHandler: (req, res, next) => {
        const data = req.body;

        req.db.Reaction.findOne({
            where: { UserId: data.auth.userId, PostId: data.postId },
        })
            .then((resp) => {
                if (resp && resp.type !== data.type) {
                    req.db.Reaction.update(
                        { type: data.type },
                        {
                            where: {
                                UserId: data.auth.userId,
                                PostId: data.postId,
                                id: resp.id,
                            },
                        }
                    )
                        .then((resp2) => {
                            req.io.emit("updatePost", resp2);
                            res.json({
                                status: true,
                                message: "Reaction updated.",
                            });
                        })
                        .catch((error2) => next(error2));
                } else if (!resp) {
                    req.db.Reaction.create({
                        type: data.type,
                        UserId: data.auth.userId,
                        PostId: data.postId,
                    })
                        .then((resp3) => {
                            req.io.emit("updatePost", resp3);
                            res.json({
                                status: true,
                                message: "Reaction added.",
                            });
                        })
                        .catch((error3) => next(error3));
                } else next("Reaction already exists.");
            })
            .catch((error) => {
                next(error);
            });
    },
};
