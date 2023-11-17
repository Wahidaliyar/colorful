const express = require("express");

const artworkController = require("./../controllers/artworkContoller");
const authController = require("./../controllers/authController");

const router = express.Router();

// router.param('id', artworkController.checkID)

router
  .route("/")
  .get(artworkController.getAllArtworks)
  .post(artworkController.uploadArtworkPhoto, artworkController.createArtwork);

router
  .route("/:id")
  .get(artworkController.getArtwork)
  .patch(artworkController.uploadArtworkPhoto, artworkController.updateArtwork)
  .delete(artworkController.deleteArtwork);

module.exports = router;
