const express = require("express");
const { authUser } = require("../middlwares/auth");
const { chatCon, getConversation } = require("../controllers/chat");

const router = express.Router();

router.post("/createChate", chatCon);
router.get("/createChate/:userId",getConversation);

module.exports = router;
