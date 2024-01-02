const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    //To give unique name to the files uploaded
    const uniqueSuffix =
    Date.now() + "-" + Math.round(Math.random() * 1e9); //generate unique suffix to add to file name
    const filename = file.originalname.split(".")[0]; //split the original file name and take the first part before the '.'
    cb(null, filename + "-" + uniqueSuffix + ".png"); // return new filename that's combination of original filename and unique suffix with .png type
  },
});

exports.upload = multer({ storage: storage }); //export function so we can reuse this externally in other files