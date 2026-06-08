const Review =
  require("../models/reviewModel");

const Product =
  require("../models/productModel");

const addReview = async (
  req,
  res
) => {

  try {

    const {
      productId,
      userName,
      rating,
      comment,
    } = req.body;

    await Review.create({
      productId,
      userName,
      rating,
      comment,
    });

    const reviews =
      await Review.find({
        productId,
      });

    const totalRating =
      reviews.reduce(
        (sum, review) =>
          sum + review.rating,
        0
      );

    const averageRating =
      totalRating /
      reviews.length;

    await Product.findByIdAndUpdate(
      productId,
      {
        averageRating:
          averageRating.toFixed(1),

        reviewCount:
          reviews.length,
      }
    );

    res.status(201).json({
      message:
        "Review added successfully",
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const getReviewsByProduct =
  async (req, res) => {

    try {

      const reviews =
        await Review.find({
          productId:
            req.params.productId,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json(
        reviews
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

module.exports = {
  addReview,
  getReviewsByProduct,
};