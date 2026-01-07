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

const express = require("express");
const router = express.Router();

const {
  startChat,
  sendMessage,
  getMyChats,
  getChatById,
  getAllChats,
} = require("../controllers/chatController");

const userWebAuth = require("../middleware/userwebAuthMiddleware");
router.get("/all", getAllChats);
/* ===============================
   USERWEB ROUTES
================================ */

router.post("/start", userWebAuth, startChat);
router.get("/my", userWebAuth, getMyChats);
router.post("/send/:id", userWebAuth, sendMessage);
router.get("/:id", userWebAuth, getChatById);

/* ===============================
   ADMIN ROUTE
================================ */



module.exports = router;
