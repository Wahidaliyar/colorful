const express = require("express");
const viewController = require("./../controllers/viewController");

const router = express.Router();

router.get("/", viewController.getHomePage);
router.get("/products/:id", viewController.getSingleProduct);
router.get("/products", viewController.getProductsPage);
router.get("/order", viewController.getOrder);
router.get("/contact", viewController.getContactPage);
router.get("/artists", viewController.getArtistsPage);
router.get("/artists/:id", viewController.getSingleArtist);
router.get("/about", viewController.getAboutPage);

module.exports = router;
