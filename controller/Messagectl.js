const Message = require("../models/MessageModel");
const conversation = require("../models/ConversationModel");
const { getReceiverSocketId, io } = require("../socket/Socket");

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let chat = await conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      conversation = await conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      chat.messages.push(newMessage._id);
    }

    await Promise.all([chat.save(), newMessage.save()]);
    // SOCKET IO FUNCTIONALITY WILL GO HERE

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    } else {
      console.log(`Receiver with id ${receiverId} is not connected.`);
    }
    res.status(200).json(newMessage);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "error while send message" });
  }
};

const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const reading = await conversation
      .findOne({
        participants: { $all: [senderId, userToChatId] },
      })
      .populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

    if (!reading) return res.status(200).json([]);

    const messages = reading.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { sendMessage, getMessage };
