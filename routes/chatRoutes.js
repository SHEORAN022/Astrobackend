// const express = require("express");
// const {
//   startChat,
//   sendMessage,
//   getChats,
//   getChat
// } = require("../controllers/chatController");

// const router = express.Router();

// router.post("/start", startChat);
// router.post("/send/:id", sendMessage);
// router.get("/all", getChats);
// router.get("/:id", getChat);

// module.exports = router;

const mongoose = require("mongoose");

const ChatSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserWeb", // ✅ userWeb model
      required: true,
    },

    name: String,
    gender: String,
    dob: String,
    tob: String,
    pob: String,
    intent: String,
    problemType: String,

    messages: [
      {
        sender: {
          type: String,
          enum: ["user", "admin", "bot"],
        },
        text: String,
        time: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    status: {
      type: String,
      default: "New",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatSession", ChatSessionSchema);
