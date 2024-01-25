const express = require("express");
const router = express.Router();
const Bidding = require("../model/bidding");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const shop = require("../model/shop");
const { upload } = require("../multer");

// create product
router.post(
    "/create-bidding",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);
        if (!shop) {
          return next(new ErrorHandler("Shop Id is invalid!", 400));
        } else {
            const files = req.files;
            const imagesUrls = files.map((file) => `${file.filesname}`);
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
  

  module.exports = router;