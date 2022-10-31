import express from "express";
import {
  register,
  login,
  getUserProfile,
  uploadFarmerCoffee,
  getAllFarmers,
  specificFarmer,
  getAllStaff,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/staff", getAllStaff);

router.post("/farmer-upload/:farmerId", uploadFarmerCoffee);
router.get("/farmerId/:id", auth, specificFarmer);
router.get("/farmers", getAllFarmers);

router.get("/profile", auth, getUserProfile);

export default router;
