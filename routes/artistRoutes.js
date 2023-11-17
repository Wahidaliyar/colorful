const express = require("express");

const artistController = require("./../controllers/artistController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(artistController.getAllArtists)
  .post(artistController.uploadArtistPhoto, artistController.createArtist);

router
  .route("/:id")
  .get(artistController.getArtist)
  .patch(artistController.uploadArtistPhoto, artistController.updateArtist)
  .delete(artistController.deleteArtist);

module.exports = router;
