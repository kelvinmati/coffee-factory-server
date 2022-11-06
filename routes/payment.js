// import express from "express";
// import {
//   getResult,
//   getTimeout,
//   getToken,
//   MakePayment,
// } from "../controllers/payment.js";
// const router = express.Router();
// router.get("/access-token", getToken);
// router.get("/pay", getToken, MakePayment);

// router.post("/result", getResult);
// router.post("/timeout", getTimeout);

// export default router;

import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import {
  getAllTrasanctions,
  getPayableFarmers,
  getSingleTransaction,
  makePayment,
  payAll,
  resetPayment,
  withdrawal,
} from "../controllers/payment.js";
router.get("/payable-farmers", getPayableFarmers);
router.get("/pay/:farmer_id", makePayment);
router.get("/transactions", getAllTrasanctions);
router.get("/farmer-transaction/:farmerId", getSingleTransaction);
router.post("/withdraw/:farmerId", withdrawal);
router.get("/pay-all", auth, payAll);
router.get("/reset", resetPayment);

export default router;
