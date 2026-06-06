const express =
  require("express");

const {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
} = require(
  "../controllers/productController"
);

const router =
  express.Router();

router.get(
  "/",
  getProducts
);
router.get(
  "/:id",
  getProductById
);
router.post(
  "/",
  createProduct
);

router.delete(
  "/:id",
  deleteProduct
);
router.put(
  "/:id",
  updateProduct
);
module.exports = router;