import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Coffee from "../models/coffee.js";
import dot_env from "dotenv";
import user from "../models/user.js";
import Payment from "../models/payment.js";
dot_env.config();
// register user
export const register = async (req, res) => {
  const { firstname, lastname, role, email, password, phone_number, gender } =
    req.body;
  try {
    // const farmerId = Math.random().toString(36).slice(3);
    const farmerId = Math.floor(1000 + Math.random() * 9000);
    // console.log("random no", randomNo);
    // check if the user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json(`Sorry ${email} already exists`);
    }
    await User.create({
      firstname,
      lastname,
      role,
      email,
      password,
      phone_number,
      gender,
      farmerId,
    });
    // generate  and asign token to the registered user
    // query the new specific user
    const newUser = await User.findOne({ email });
    const token = jwt.sign({ id: newUser._id }, process.env.REGISTER_SECRET);
    res.status(200).json({ message: "Succesfully registered", token });
  } catch (error) {
    res.status(500).json(error);
  }
};
// login user
export const login = async (req, res) => {
  // res.send("Login route");
  const { email, password } = req.body;
  try {
    // check if given email and password matches the one in the db
    const existingUser = await User.findOne({ email });

    if (!existingUser || existingUser.password !== password)
      return res.status(409).json("Invalid credentials !!.Try again");

    // generate and assign login token
    const token = jwt.sign({ id: existingUser._id }, process.env.LOGIN_SECRET, {
      expiresIn: "20 days",
    });
    // const role = existingUser.role;
    res
      .status(200)
      .json({ message: "successfully logged in", token, existingUser });
  } catch (error) {
    res.status(500).json(error);
  }
};
// upload farmers coffee
export const uploadFarmerCoffee = async (req, res) => {
  const { farmerId } = req.params;
  try {
    const uploadedCoffee = await Coffee.create(req.body);
    const foundFarmer = await User.findOneAndUpdate(
      { _id: farmerId, role: "farmer" },
      {
        $push: {
          coffeeDetails: uploadedCoffee._id,
        },
      },
      {
        new: true,
      }
    ).populate("coffeeDetails");
    // store all the values under quantity key to an array
    const qtyArr = await foundFarmer?.coffeeDetails?.map((weight) => {
      return parseInt(weight?.quantity);
    });
    // do the sumation of the weight
    const totalWeight = qtyArr.reduce((a, b) => {
      return a + b;
    });
    // value of the coffee
    const totalValue = totalWeight * process.env.RATE;
    // update Kilo field after upload
    const populatedFarmer = await User.findByIdAndUpdate(
      {
        _id: farmerId,
      },
      { $set: { totalKilos: totalWeight, value: totalValue } },
      { new: true }
    );
    const returnedFarmer = {
      // coffeeDetails: populatedFarmer.coffeeDetails,
      farmer: populatedFarmer?.firstname.concat(" ", populatedFarmer?.lastname),
      message: "succesfully uploaded",
    };
    return res.status(200).json({ returnedFarmer });
  } catch (error) {
    res.status(500).json(error);
  }
};

// get specific farmer
export const specificFarmer = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById({ _id: id })
      .populate("coffeeDetails")
      .populate("paymentRecord");
    //user.find({ arrayElementName: { $exists: true, $size: 0 } });
    // check if the array has data
    const coffeeDetailsArr = user?.coffeeDetails;
    if (coffeeDetailsArr?.length == 0) {
      // console.log("EMPTY");
      return res.status(200).json(user);
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
// get all farmers
export const getAllFarmers = async (req, res) => {
  // const{}
  try {
    const farmers = await User?.find({ role: "farmer" }).populate(
      "coffeeDetails"
    );
    res.status(200).json(farmers);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
// get all staff
export const getAllStaff = async (req, res) => {
  // const{}
  try {
    const staff = await User?.find({ role: "Staff" });
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
// get user profile
export const getUserProfile = async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const decoded = jwt.verify(token, process.env.LOGIN_SECRET);
    const currentUser = await User.findOne({ _id: decoded.id })
      .populate("coffeeDetails")
      .populate("paymentRecord");
    // check if the array has data
    const coffeeDetailsArr = currentUser?.coffeeDetails;
    if (coffeeDetailsArr?.length == 0) {
      return res.status(200).json(currentUser);
    } else {
      return res.status(200).json(currentUser);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
