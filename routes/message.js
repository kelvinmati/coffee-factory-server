import express from "express";

const router = express.Router();
import Message from "../models/messages.js";
router.post("/create-message", async (req, res) => {
  try {
    const createdMsg = await Message.create(req.body);
    res.status(200).json(createdMsg);
  } catch (error) {
    res.status(500).json(error);
  }
});
// get msg
router.get("/get-message/:conversationId", async (req, res) => {
  try {
    const foundConvo = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(foundConvo);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
