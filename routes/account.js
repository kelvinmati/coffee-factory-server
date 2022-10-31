import express from "express";
import {
  createAccount,
  deposit,
  getAccBalance,
} from "../controllers/account.js";
const router = express.Router();
router.get("/create-acc", createAccount);
router.post("/deposit", deposit);
router.get("/balance", getAccBalance);

export default router;
