const express = require("express");
const {
  createPost,
  getAllPosts,
  comment,
  savePost,
  deletePost,
  getSavedPosts,
  reportPost,
  getReportedPosts
} = require("../controllers/post");
const { authUser } = require("../middlwares/auth");

const router = express.Router();

router.post("/createPost", authUser, createPost);
router.get("/getAllPosts", authUser, getAllPosts);
router.put("/comment", authUser, comment);
router.put("/savePost/:id", authUser, savePost);
router.delete("/deletePost/:id", authUser, deletePost);
router.get("/savedPosts",authUser, getSavedPosts);
router.put("/reportPost/:id", authUser,reportPost );
router.get("/getReportPosts",getReportedPosts );

module.exports = router;
