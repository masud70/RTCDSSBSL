//imports
const express = require("express");
const { createPost, getAllPost, postComment } = require("../controllers/postController");
const { checkLogin } = require("../middlewares/common");

const router = express.Router();

router.post("/create", checkLogin, createPost);
router.get("/getAll", getAllPost);
router.post('/postComment', checkLogin, postComment);

module.exports = router;
