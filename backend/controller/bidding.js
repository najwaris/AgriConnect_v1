const express = require("express");
const router = express.Router();
const Bidding = require("../model/bidding");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
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

module.exports = router;
