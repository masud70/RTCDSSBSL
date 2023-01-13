module.exports = {
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

    getAllPost2: (req, res, next) => {
        req.db.Post.findAll({
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
        })
            .then((resp) => {
                let posts = resp;
                resp.map((it, id) => {
                    req.db.Comment.findAll({
                        where: { PostId: it.id },
                    }).then((comments) => {
                        posts[id].comments = comments;
                        console.log(comments);
                    });
                });
                if (resp) {
                    res.json({ status: true, data: posts });
                } else {
                    next("There was an error.");
                }
            })
            .catch((error) => {
                next(error);
            });
    },

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
                });
                const cmnts = { comments: comments };
                ret.push({ ...posts[idx].dataValues, ...cmnts });
            }
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
                    res.json({
                        status: true,
                        data: resp,
                        message: "Comment added successfully.",
                    });
                } else next("There was an error. Please try again.");
            })
            .catch((error) => next(error));
    },
};
