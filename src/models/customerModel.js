import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  location: String,
  phone:String,
  totalSpent: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const customerModel = mongoose.model('Customer', customerSchema);
export default customerModel
