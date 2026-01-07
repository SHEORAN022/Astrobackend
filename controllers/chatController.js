// const ChatSession = require("../models/ChatSession");

// // Create new chat
// exports.startChat = async (req, res) => {
//   const chat = await ChatSession.create(req.body);
//   res.json(chat);
// };

// // Send message
// exports.sendMessage = async (req, res) => {
//   const { id } = req.params;
//   const { sender, text } = req.body;

//   const chat = await ChatSession.findById(id);
//   chat.messages.push({ sender, text });
//   await chat.save();

//   res.json(chat);
// };

// // Get all chats (Admin)
// exports.getChats = async (req, res) => {
//   const chats = await ChatSession.find().sort({ createdAt: -1 });
//   res.json(chats);
// };

// // Get single chat
// exports.getChat = async (req, res) => {
//   const chat = await ChatSession.findById(req.params.id);
//   res.json(chat);
// };

const ChatSession = require("../models/ChatSession");

/* ===============================
   USERWEB → START CHAT
================================ */
exports.startChat = async (req, res) => {
  try {
    const chat = await ChatSession.create({
      ...req.body,
      user: req.user._id, // 🔐 userWeb binding
    });

    res.status(201).json({
      success: true,
      chat,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/* ===============================
   USERWEB → SEND MESSAGE (OWN CHAT)
================================ */
exports.sendMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { sender, text } = req.body;

    const chat = await ChatSession.findOne({
      _id: id,
      user: req.user._id, // 🔐 ownership check
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found or access denied",
      });
    }

    chat.messages.push({ sender, text });
    await chat.save();

    res.json({
      success: true,
      chat,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/* ===============================
   USERWEB → GET MY CHATS
================================ */
exports.getMyChats = async (req, res) => {
  try {
    const chats = await ChatSession.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      chats,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/* ===============================
   USERWEB → GET SINGLE CHAT
================================ */
exports.getChatById = async (req, res) => {
  try {
    const chat = await ChatSession.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found or access denied",
      });
    }

    res.json({
      success: true,
      chat,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/* ===============================
   ADMIN → GET ALL CHATS
================================ */
exports.getAllChats = async (req, res) => {
  try {
    const chats = await ChatSession.find()
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      chats,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
