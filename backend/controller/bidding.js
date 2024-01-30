const express = require("express");
const router = express.Router();
const Bidding = require("../model/bidding");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const User = require("../model/user");
const { upload } = require("../multer");
const { isSeller } = require("../middleware/auth");
const fs = require("fs");

// create product
router.post(
  "/create-bidding",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        const files = req.files;
        const imagesUrls = files.map((file) => `${file.filename}`);
        const biddingData = req.body;
        biddingData.images = imagesUrls;
        biddingData.shop = shop;

        const bidding = await Bidding.create(biddingData);
        res.status(201).json({
          success: true,
          bidding,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.get(
  "/get-all-biddings/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const biddings = await Bidding.find({ shopId: req.params.id });
      res.status(201).json({
        success: true,
        biddings,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//delete bidding from shop
router.delete(
  "/delete-shop-bidding/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const biddingId = req.params.id;
      const biddingData = await Bidding.findById(biddingId);

      if (!biddingData) {
        return next(new ErrorHandler("Bidding not found with this id!", 500));
      }
      biddingData.images.forEach((imagesUrl) => {
        const filename = imagesUrl;
        const filePath = `uploads/${filename}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "Error deleting file" });
          }
        });
      });

      const bidding = await Bidding.findByIdAndDelete(biddingId);

      res.status(201).json({
        success: true,
        message: "Bidding deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products
router.get(
  "/get-all-biddings",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const biddings = await Bidding.find().sort({ createdAt: -1 });
      res.status(201).json({
        success: true,
        biddings,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.post("/submit-bid/:Id", async (req, res,next) => {
  try {
    const biddingId = req.params.Id;
    const { userId, bidAmount } = req.body;

    const bidding = await Bidding.findById(biddingId);
    if (!bidding) {
      return next(new ErrorHandler("Bidding not found!", 404));
    }

    if (bidding.status === "Ended") {
      return next(new ErrorHandler("Bidding has Ended!", 404));
    }
    // Check if bid is valid
    if (
      (bidding.highestBid === 0 && bidAmount <= bidding.minimumPrice) ||
      (bidding.highestBid > 0 && bidAmount <= bidding.highestBid)
    ) {
      return res
        .status(400)
        .json({ message: "Bid must be higher than the current highest bid" });
    }

    // Fetch user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update bidding details
    bidding.highestBid = bidAmount;
    bidding.highestBidder = user._id;
    await bidding.save();

    res.status(200).json({
      message: "Bid submitted successfully",
      bidding,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

router.patch("/end-bidding/:Id", async (req, res, next) => {
  try {
    const biddingId = req.params.Id;
    const bidding = await Bidding.findById(biddingId);
    if (!bidding) {
      return next(new ErrorHandler("Bidding not found!", 404));
    }
    if (bidding.status === "Ended") {
      return next(new ErrorHandler("Already Ended!", 404));
    }
    // Find the bidding item and update its status
    const updatedBidding = await Bidding.findByIdAndUpdate(
      biddingId,
      { status: "Ended" },
      { new: true }
    );

    if (!updatedBidding) {
      return res.status(404).json({ message: "Bidding item not found" });
    }

    res.status(200).json({
      message: "Bidding ended successfully",
      updatedBidding,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

router.get("/user-winning-bids/:userId", async (req, res,next) => {
  try {
      const  userId  = req.params.userId;

      const winningBids = await Bidding.find({
          highestBidder: userId,
          status: "Ended"
      }).populate('highestBidder'); // This will populate the highestBidder field with user details

      res.status(200).json({
          success: true,
          winningBids,
      });
  } catch (error) {
      res.status(500).json({ message: "An error occurred", error: error.message });
  }
});

router.get("/ended-biddings/:shopId", async (req, res) => {
  try {
      const shopId  = req.params.shopId;

      const endedBiddings = await Bidding.find({
          shopId: shopId,
          status: "Ended"
      }).populate('highestBidder'); // Populating the highestBidder field

      res.status(200).json({
          success: true,
          endedBiddings,
      });

  } catch (error) {
      res.status(500).json({ message: "An error occurred", error: error.message });
  }
});

router.patch("/Order-complete/:biddingId", async (req, res) => {
  try {
      const  biddingId = req.params.biddingId;

      const updatedBidding = await Bidding.findByIdAndUpdate(
          biddingId,
          { Orderstatus: "Completed" },
          { new: true }
      );

      if (!updatedBidding) {
          return res.status(404).json({ message: "Bidding not found" });
      }

      res.status(200).json({
          success: true,
          updatedBidding
      });
  } catch (error) {
      res.status(500).json({ message: "An error occurred", error: error.message });
  }
});

router.patch("/Order-cancel/:biddingId", async (req, res) => {
  try {
      const  biddingId  = req.params.biddingId;

      const updatedBidding = await Bidding.findByIdAndUpdate(
          biddingId,
          { Orderstatus: "Cancelled" },
          { new: true }
      );

      if (!updatedBidding) {
          return res.status(404).json({ message: "Bidding not found" });
      }

      res.status(200).json({
          success: true,
          updatedBidding
      });
  } catch (error) {
      res.status(500).json({ message: "An error occurred", error: error.message });
  }
});


module.exports = router;
