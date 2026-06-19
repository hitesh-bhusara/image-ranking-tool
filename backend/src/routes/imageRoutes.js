const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

// const {
//   uploadImage
// } = require("../controllers/imageController");

const {
  uploadImage,
  bulkUploadImages
} = require("../controllers/imageController");

router.post(
  "/upload",
  upload.single("image"),
  uploadImage
);

router.post(
  "/bulk-upload",
  upload.array("images", 500),
  bulkUploadImages
);

module.exports = router;  