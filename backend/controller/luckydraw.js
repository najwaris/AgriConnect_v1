const express = require("express");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const { upload } = require("../multer");
const Shop = require("../model/shop");
const User = require("../model/user");
const Luckydraw = require("../model/luckydraw");
const { isSeller } = require("../middleware/auth");
const router = express.Router();
const fs = require("fs");

// create product
router.post(
  "/create-luckydraw",
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
        const luckydrawData = req.body;
        luckydrawData.images = imagesUrls;
        luckydrawData.shop = shop;

        const luckydraw = await Luckydraw.create(luckydrawData);
        res.status(201).json({
          success: true,
          luckydraw,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.get(
  "/get-all-luckydraws/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const luckydraws = await Luckydraw.find({ shopId: req.params.id });
      res.status(201).json({
        success: true,
        luckydraws,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//delete luckydraw from shop
router.delete(
  "/delete-shop-luckydraw/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const luckydrawId = req.params.id;
      const luckydrawData = await Luckydraw.findById(luckydrawId);

      if (!luckydrawData) {
        return next(new ErrorHandler("Luckydraw not found with this id!", 500));
      }
      luckydrawData.images.forEach((imagesUrl) => {
        const filename = imagesUrl;
        const filePath = `uploads/${filename}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "Error deleting file" });
          }
        });
      });

      const luckydraw = await Luckydraw.findByIdAndDelete(luckydrawId);
      res.status(201).json({
        success: true,
        message: "Luckydraw deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products
router.get(
  "/get-all-luckydraws",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const luckydraws = await Luckydraw.find().sort({ createdAt: -1 });
      res.status(201).json({
        success: true,
        luckydraws,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.post(
  "/add-participant/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const luckydrawId = req.params.id;
      const luckydraw = await Luckydraw.findById(luckydrawId);

      console.log(luckydraw);
      const userId = req.body.userId;

      if (!luckydraw) {
        return next(new ErrorHandler("Luckydraw not found!", 404));
      }
      // Check if user is already a participant
      const isParticipant = luckydraw.participants.includes(userId);
      if (isParticipant) {
        return next(
          new ErrorHandler("Already participating in luckydraw!", 400)
        );
      }
      // Add user to participants array
      luckydraw.participants.push(userId);
      await luckydraw.save();

      res.status(201).json({
        success: true,
        message: "User added to participants",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.post("/select-winner/:id", async (req, res, next) => {
  try {
    // Retrieve the lucky draw
    const luckydraw = await Luckydraw.findById(req.params.id);
    if (!luckydraw) {
      return next(new ErrorHandler("Luckydraw not found!", 404));
    }

    if (luckydraw.status === "Ended") {
      return next(new ErrorHandler("Already chosed winner!", 404));
    }
    // Ensure there are participants
    if (luckydraw.participants.length === 0) {
      return res
        .status(400)
        .json({ message: "No participants in the lucky draw!" });
    }

    // Select a random winner from participants
    const randomIndex = Math.floor(
      Math.random() * luckydraw.participants.length
    );
    const winnerId = luckydraw.participants[randomIndex];

    // Retrieve the user object
    const winner = await User.findById(winnerId);
    if (!winner) {
      return res.status(404).json({ message: "Winner not found!" });
    }
    // Update the lucky draw with winner information and change status
    luckydraw.winnerID = winnerId;
    luckydraw.winner = winner; // Be cautious about storing full user objects
    luckydraw.status = "Ended"; // Update the status to 'Ended'

    await luckydraw.save();

    res.status(200).json({
      success: true,
      message: "Winner selected successfully and lucky draw ended",
      winner: winner,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "An error occurred", error: error.message });
  }
});

router.get("/user-won-luckydraws/:userId", async (req, res) => {
  try {
      const  userId  = req.params.userId;

      const wonLuckyDraws = await Luckydraw.find({
          winnerID: userId,
          status: "Ended"
      })

      res.status(200).json({
          success: true,
          wonLuckyDraws,
      });
  } catch (error) {
      res.status(500).json({ message: "An error occurred", error: error.message });
  }
});

router.get("/seller-luckydraws/:sellerId", async (req, res) => {
  try {
      const sellerId  = req.params.sellerId;

      const sellerLuckyDraws = await Luckydraw.find({
          shopId: sellerId,
          status: "Ended"
      });

      res.status(200).json({
          success: true,
          sellerLuckyDraws,
      });
  } catch (error) {
      res.status(500).json({ message: "An error occurred", error: error.message });
  }
});

router.patch("/luckydraw-complete/:luckydrawId", async (req, res) => {
  try {
      const  luckydrawId  = req.params.luckydrawId;

      const updatedLuckydraw = await Luckydraw.findByIdAndUpdate(
          luckydrawId,
          { Orderstatus: "Completed" },
          { new: true }
      );

      if (!updatedLuckydraw) {
          return res.status(404).json({ message: "Luckydraw not found" });
      }

      res.status(200).json({
          success: true,
          updatedLuckydraw
      });
  } catch (error) {
      res.status(500).json({ message: "An error occurred", error: error.message });
  }
});

router.patch("/luckydraw-cancel/:luckydrawId", async (req, res) => {
  try {
      const luckydrawId  = req.params.luckydrawId;

      const updatedLuckydraw = await Luckydraw.findByIdAndUpdate(
          luckydrawId,
          { Orderstatus: "Cancelled" },
          { new: true }
      );

      if (!updatedLuckydraw) {
          return res.status(404).json({ message: "Luckydraw not found" });
      }

      res.status(200).json({
          success: true,
          updatedLuckydraw
      });
  } catch (error) {
      res.status(500).json({ message: "An error occurred", error: error.message });
  }
});


module.exports = router;
