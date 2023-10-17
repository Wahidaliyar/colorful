const express = require("express");

const artworkController = require("./../controllers/artworkContoller");
const authController = require("./../controllers/authController");
const commentRouter = require("./commentRoutes")

const router = express.Router();

// router.param('id', artworkController.checkID)

router.use('/:artworkId/comments', commentRouter)

router
  .route("/")
  .get(artworkController.getAllArtworks)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    artworkController.createArtwork
  );

router
  .route("/:id")
  .get(artworkController.getArtwork)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    artworkController.updateArtwork
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    artworkController.deleteArtwork
  );


module.exports = router;
