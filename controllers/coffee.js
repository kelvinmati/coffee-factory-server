import Coffee from "../models/coffee.js";
import User from "../models/user.js";
export const uploadUserCoffee = async (req, res) => {
  const { coffee_type, quantity, date_submitted, farmer } = req.body;
  try {
    const submittedCoffee = await Coffee.create({
      coffee_type,
      quantity,
      date_submitted,
    });
    res.status(200).json({ submittedCoffee, message: "succesfully submitted" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserCoffeeDetails = async (req, res) => {
  try {
    const coffeeDetails = await Coffee.find();
    res.status(200).json(coffeeDetails);
  } catch (error) {
    res.status(500).json(error);
  }
};
