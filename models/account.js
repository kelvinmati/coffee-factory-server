import mongoose from "mongoose";
const schema = mongoose.Schema;
const accountShema = schema({
  account_name: {
    type: String,
    default: "Ithe Mutiki Coffee Factory",
  },
  account_balance: {
    type: Number,
    default: 0,
  },
  isCreated: {
    type: Boolean,
    default: false,
  },
});
export default mongoose.model("account", accountShema);
