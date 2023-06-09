import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/user.js";
import coffeeRoute from "./routes/coffee.js";
import paymentRoute from "./routes/payment.js";
import accountRoute from "./routes/account.js";
import dot_env from "dotenv";
dot_env.config();
import cors from "cors";
import conversationRoute from "./routes/conversation.js";
import messageRoute from "./routes/message.js";

const app = express();
// express middlewares
app.use(express.json());
app.use(cors("*"));

// routes middleware
app.use("/user", authRoute);
app.use("/coffee", coffeeRoute);
app.use("/payment", paymentRoute);
app.use("/account", accountRoute);
app.use("/chat", conversationRoute);
app.use("/message", messageRoute);

// base url
app.get("/", (req, res) => {
  res.send("Welcome to Ithe mutiki api");
});
// db connection
mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(() => console.log("Database connected succesfully"))
  .catch((err) => console.log(err));

// server setup
const PORT = 4001;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
