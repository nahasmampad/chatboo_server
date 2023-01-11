const express = require("express");
const { authUser } = require("../middlwares/auth");
const {getallpost,getallusers,blockPost,blockUser} =require('../controllers/admin.js')

const router = express.Router();

router.get("/adminGetPost",authUser, getallpost);
router.get("/adminGetUsers",authUser, getallusers);
router.get("/blockPost/:id",authUser, blockPost);
router.get("/blockUser/:id",authUser, blockUser);

module.exports = router;