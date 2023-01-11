const ConversationModel = require("../models/Conversation");
const Message = require("../models/Message");

exports.chatCon = async (req, res) => {
  const { senderId, reciverId } = req.body;

  const con = await ConversationModel.find({
    members: { $all: [senderId, reciverId] },
  });
  console.log(con.length, "con");
  const newConversation = new ConversationModel({
    members: [senderId, reciverId],
  });
  try {
    if (con.length === 0) {
      const saveConversation = await newConversation.save();
      res.status(200).json(saveConversation);
    } else{
      console.log('else');
      res.status(200).json({message:'all redy have chat',success:false});
    }

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getConversation = async (req, res) => {
  const { userId } = req.params;

  try {
    const conversation = await ConversationModel.find({
      members: { $in: [req.params.userId] },
    });

    res
      .status(200)
      .json({ status: true, conversation, message: "get conversation" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.message = async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const saveMessage = await newMessage.save();
    res
      .status(200)
      .json({ status: true, saveMessage, message: "from message" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getMessage = async (req, res) => {
  const { conversationId } = req.params;
  try {
    const messages = await Message.find({
      conversationId: conversationId,
    });
    res
      .status(200)
      .json({ status: true, messages, message: "from getMessage" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
