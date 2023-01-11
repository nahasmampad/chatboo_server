const express = require("express");
const { authUser } = require("../middlwares/auth");
const {message, getMessage} =require("../controllers/chat");

const router = express.Router();

router.post("/message", message);
router.get("/message/:conversationId", getMessage);





module.exports = router;
