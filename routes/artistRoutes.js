const express = require("express");

const artistController = require("./../controllers/artistController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(artistController.getAllArtists)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    artistController.createArtist
  );

router
  .route("/:id")
  .get(artistController.getArtist)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    artistController.updateArtist
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    artistController.deleteArtist
  );

module.exports = router;
