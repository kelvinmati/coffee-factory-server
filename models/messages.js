import mongoose, { mongo, Schema } from "mongoose";
const schema = mongoose.Schema;
const messageSchema = schema(
  {
    conversationId: {
      type: String,
    },
    text: {
      type: String,
    },
    sender: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("message", messageSchema);
