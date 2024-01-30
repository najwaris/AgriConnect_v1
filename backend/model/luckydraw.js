const mongoose = require("mongoose");

const luckydrawSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
  },
  description: {
    type: String,
    required: [true, "Please state clearly the amount, and all the defects on the products!"],
  },
  category: {
    type: String,
    required: [true, "Please enter your product category!"],
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  status: {
    type: String,
    default: "Running",
  },
  tags: {
    type: String,
  },
  participants: [
    { type: mongoose.Schema.Types.ObjectId, 
      ref: "User" }
    ],
  images: [
    {
      type: String,
    },
  ],
  winnerID: {
    type: String,
  },
  winner: {
    type: Object,
  },
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  Orderstatus: {
    type: String,
    default: "Pending Pickup",
  },
});

module.exports = mongoose.model("Luckydraw", luckydrawSchema);
