import express from "express";
import {
  getUserCoffeeDetails,
  uploadUserCoffee,
} from "../controllers/coffee.js";
const router = express.Router();
router.post("/upload", uploadUserCoffee);
router.get("/coffee-details", getUserCoffeeDetails);
export default router;
