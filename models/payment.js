import mongoose from "mongoose";
const schema = mongoose.Schema;
const paymentSchema = schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    // coffeeDetails: [
    //   {
    //     type: String,
    //   },
    // ],
    farmerId: {
      type: String,
      required: [true, "Farmer id is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("payment", paymentSchema);
