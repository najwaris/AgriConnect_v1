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
  startDate: {
    type: Date,
  },
  finishDate: {
    type: Date,
    validate: {
      validator: function () {
        return this.startDate < this.finishDate;
      },
      message: "Finish date must be after start date.",
    },
  },
  status: {
    type: String,
    default: "Running",
    enum: ["Running", "Completed", "Cancelled"],
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
  },
  highestBidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
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
});

module.exports = mongoose.model("Bidding", biddingSchema);