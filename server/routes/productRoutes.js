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

const upload =
  require(
    "../middleware/upload"
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
  upload.array(
    "images",
    10
  ),
  createProduct
);

router.put(
  "/:id",
  upload.array(
    "images",
    10
  ),
  updateProduct
);

router.delete(
  "/:id",
  deleteProduct
);

module.exports =
  router;