import express from "express";
import auth from "../middleware/auth.js";
import {
  createAccount,
  deposit,
  getAccBalance,
} from "../controllers/account.js";
const router = express.Router();
router.get("/create-acc", createAccount);
router.post("/deposit", auth, deposit);
router.get("/balance", getAccBalance);

export default router;
