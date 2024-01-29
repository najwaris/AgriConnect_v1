const express = require("express");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const { upload } = require("../multer");
const Shop = require("../model/shop");
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

module.exports = router;
