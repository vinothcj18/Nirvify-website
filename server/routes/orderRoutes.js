const express = require("express");
const multer = require("multer");

const {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getUserOrders
} = require("../controllers/orderController");

const router = express.Router();

const storage = multer.diskStorage({

  destination: (
    req,
    file,
    cb
  ) => {

    cb(
      null,
      "uploads"
    );

  },

  filename: (
    req,
    file,
    cb
  ) => {

    cb(
      null,
      Date.now() +
        "-" +
        file.originalname
    );

  },

});

const upload = multer({
  storage,
});

router.get(
  "/user/:email",
  getUserOrders
);
router.get("/", getAllOrders);
router.put(
  "/:id",
  updateOrderStatus
);

router.post(
  "/",
  upload.single(
    "paymentScreenshot"
  ),
  createOrder
);

module.exports = router;