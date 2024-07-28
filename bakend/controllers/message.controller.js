import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId,io } from "../socketIo/server.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // current logged in user

    console.log("Sending message:", { senderId, receiverId, message });

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      console.log("Creating new conversation between:", { senderId, receiverId });
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // Save both in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    // socketio se hai
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);



    // res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id; // current logged in user
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("messages");
    if (!conversation) {
      return res.status(201).json([]);
    }
    const messages = conversation.messages;
    res.status(201).json(messages);
  } catch (error) {
    console.log("Error in getMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};