//imports
const express = require("express");
const { createPost, getAllPost, postComment, getSinglePostById, reactionHandler, getAllPost2 } = require("../controllers/postController");
const { checkLogin } = require("../middlewares/common");

const router = express.Router();

router.post("/create", checkLogin, createPost);
router.get("/getAll", getAllPost);
router.get("/getAll2", getAllPost2);
router.post('/postComment', checkLogin, postComment);
router.get('/getPost/:id', getSinglePostById);
router.post('/reaction', checkLogin, reactionHandler)

module.exports = router;
