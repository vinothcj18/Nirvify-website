import { useState,useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminProducts() {

  const [products, setProducts] =
  useState([]);
  const [editingId, setEditingId] =
  useState(null);

const [formData, setFormData] =
  useState({
      name: "",
      price: "",
      category: "",
      image: "",
      description: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };
const fetchProducts =
  async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/products"
        );

      setProducts(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

  };
  useEffect(() => {

  fetchProducts();

}, []);
const deleteProduct = async (
  id
) => {

  const confirmDelete =
    window.confirm(
      "Delete this product?"
    );

  if (!confirmDelete)
    return;

  try {

    await axios.delete(
      `http://localhost:5000/api/products/${id}`
    );

    fetchProducts();

  } catch (error) {

    console.log(error);

  }

};
const editProduct = (
  product
) => {

  setEditingId(
    product._id
  );

  setFormData({
    name:
      product.name,

    price:
      product.price,

    category:
      product.category,

    image:
      product.images?.[0] || "",

    description:
      product.description.join(
        ", "
      ),
  });

};

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

       if (editingId) {

  await axios.put(
    `http://localhost:5000/api/products/${editingId}`,
    {
      name:
        formData.name,

      price:
        Number(
          formData.price
        ),

      category:
        formData.category,

      images: [
        formData.image,
      ],

      description:
        formData.description
          .split(",")
          .map((item) =>
            item.trim()
          ),
      }
    );

} else {

  await axios.post(
    "http://localhost:5000/api/products",
    {
      name:
        formData.name,

      price:
        Number(
          formData.price
        ),

      category:
        formData.category,

      images: [
        formData.image,
      ],

      description:
        formData.description
          .split(",")
          .map((item) =>
            item.trim()
          ),
    }
  );

}

        alert(
          "Product Added Successfully"
        );
        fetchProducts();
        setEditingId(null);
        setFormData({
          name: "",
          price: "",
          category: "",
          image: "",
          description: "",
        });

      } catch (error) {

        console.log(error);

      }

      

    };


    
  return (
    <div>

      <Navbar />

      <div
        style={{
          maxWidth: "600px",
          margin: "40px auto",
        }}
      >

        <h1>
          Add Product
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
        >

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={
              formData.name
            }
            onChange={
              handleChange
            }
          />

          <br />
          <br />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={
              formData.price
            }
            onChange={
              handleChange
            }
          />

          <br />
          <br />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={
              formData.category
            }
            onChange={
              handleChange
            }
          />

          <br />
          <br />

          <input
            type="text"
            name="image"
            placeholder="Image Path"
            value={
              formData.image
            }
            onChange={
              handleChange
            }
          />

          <br />
          <br />

          <textarea
            rows="5"
            name="description"
            placeholder="Description points separated by commas"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
          />

          <br />
          <br />

         <button
  type="submit"
>
  {
    editingId
      ? "Update Product"
      : "Add Product"
  }
</button>

        </form>

<hr
  style={{
    margin: "30px 0",
  }}
/>

<h2>
  Existing Products
</h2>

{products.length === 0 ? (

  <p>
    No Products Found
  </p>

) : (

  products.map(
    (product) => (

      <div
        key={product._id}
        style={{
          padding: "15px",
          marginTop: "10px",
          border:
            "1px solid #ddd",
          borderRadius:
            "8px",
          background:
            "#fff",
        }}
      >

        <h3>
          {product.name}
        </h3>

        <p>
          ₹{product.price}
        </p>

        <p>
  {product.category}
</p>

<div
  style={{
    marginTop: "10px",
  }}
>

  <button
    onClick={() =>
      editProduct(
        product
      )
    }
    style={{
      background:
        "#ffc107",
      color: "black",
      border: "none",
      padding:
        "8px 14px",
      borderRadius:
        "6px",
      cursor: "pointer",
      marginRight:
        "10px",
    }}
  >
    Edit Product
  </button>

  <button
    onClick={() =>
      deleteProduct(
        product._id
      )
    }
    style={{
      background:
        "#dc3545",
      color: "white",
      border: "none",
      padding:
        "8px 14px",
      borderRadius:
        "6px",
      cursor: "pointer",
    }}
  >
    Delete Product
  </button>

</div>

      </div>

    )
  )

)}

</div>

<Footer />

    </div>
  );
}

export default AdminProducts;