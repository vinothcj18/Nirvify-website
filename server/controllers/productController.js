const Product =
  require("../models/productModel");

const getProducts = async (
  req,
  res
) => {

  try {

    const products =
      await Product.find();

    res.status(200).json(
      products
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

const createProduct = async (
  req,
  res
) => {

  try {

    const imageUrls =
      req.files.map(
        (file) =>
          file.path
      );

    const product =
      await Product.create({
        name:
          req.body.name,

        price:
          req.body.price,

        category:
          req.body.category,

        colors:
          req.body.colors
            ? JSON.parse(
                req.body.colors
              )
            : [],

        description:
          req.body.description
            ? JSON.parse(
                req.body.description
              )
            : [],

        images:
          imageUrls,
      });

    res.status(201).json(
      product
    );

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};
const deleteProduct = async (
  req,
  res
) => {

  try {

    await Product.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "Product deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

const updateProduct = async (
  req,
  res
) => {

  try {

    let imageUrls = [];

    if (
      req.files &&
      req.files.length > 0
    ) {

      imageUrls =
        req.files.map(
          (file) =>
            file.path
        );

    }

    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        {
          name:
            req.body.name,

          price:
            req.body.price,

          category:
            req.body.category,

          colors:
            req.body.colors
              ? JSON.parse(
                  req.body.colors
                )
              : [],

          description:
            req.body.description
              ? JSON.parse(
                  req.body.description
                )
              : [],

          ...(imageUrls.length >
            0 && {
            images:
              imageUrls,
          }),
        },
        {
          new: true,
        }
      );

    res.status(200).json(
      updatedProduct
    );

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};
const getProductById = async (
  req,
  res
) => {

  try {

    const product =
      await Product.findById(
        req.params.id
      );

    res.status(200).json(
      product
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
};