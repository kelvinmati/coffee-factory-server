import mongoose from "mongoose";
const schema = mongoose.Schema;
const coffeeSchema = schema(
  {
    farmer: {
      type: schema.Types.ObjectId,
      ref: "users",
    },
    coffee_type: {
      type: String,
      required: [true, "Type of coffee is required"],
    },
    quantity: {
      type: String,
      required: [true, "The quantity of coffee is required"],
    },
    served_by: {
      type: String,
      required: false,
    },
  },

  { timestamps: true }
);

export default mongoose.model("coffee", coffeeSchema);
