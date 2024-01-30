const mongoose = require("mongoose");

const biddingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter your product description!"],
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
  minimumPrice: {
    type: Number,
    required: [true, "Please enter your minimum bidding price!"],
  },
  highestBid: {
    type: Number,
    default: 0,
  },
  highestBidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  },
  images: [
    {
      type: String,
    },
  ],
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

module.exports = mongoose.model("Bidding", biddingSchema);
