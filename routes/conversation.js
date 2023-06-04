import express from "express";
const router = express.Router();
import Conversation from "../models/conversation.js";
import User from "../models/user.js";
router.post("/create-conversations", async (req, res) => {
  //   const { senderId, receiverId } = req.body;
  //   const newConvo=await
  try {
    const newConversation = await Conversation.create({
      members: [req.body.senderId, req.body.receiverId],
    });
    res.status(200).json(newConversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get-conversation/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const foundConversation = await Conversation.find({
      members: { $in: [userId] },
    });
    res.status(200).json(foundConversation);
  } catch (error) {
    res.status(500).json(error);
  }
});
export default router;
// steve 63589db09ad1348d30624183
// susan 637d3a8c2e834c11a3e17948
// kelvin 637daf3e0c247a76b5d02425
