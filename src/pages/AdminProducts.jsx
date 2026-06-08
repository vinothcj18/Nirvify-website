import { useState,useEffect } from "react";
import axios from "axios";
import "../styles/AdminProducts.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminProducts() {

  const [products, setProducts] =
  useState([]);
  const [editingId, setEditingId] =
  useState(null);
const [message, setMessage] =
  useState("");
const [selectedFiles, setSelectedFiles] =
  useState([]);

const [formData, setFormData] =
  useState({
      name: "",
      price: "",
      category: "",
      colors: "",
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
          "https://nirvify-backend.onrender.com/api/products"
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
      `https://nirvify-backend.onrender.com/api/products/${id}`
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
    product.images?.join(", ") || "",

  colors:
    product.colors?.join(", ") || "",

  description:
    product.description.join(
      "| "
    ),
});

};

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const data =
  new FormData();

data.append(
  "name",
  formData.name
);

data.append(
  "price",
  formData.price
);

data.append(
  "category",
  formData.category
);

data.append(
  "colors",
  JSON.stringify(
    formData.colors
      ? formData.colors
          .split(",")
          .map((color) =>
            color.trim()
          )
      : []
  )
);

data.append(
  "description",
  JSON.stringify(
    formData.description
      .split("|")
      .map((item) =>
        item.trim()
      )
  )
);

for (
  let i = 0;
  i < selectedFiles.length;
  i++
) {

  data.append(
    "images",
    selectedFiles[i]
  );

}

       if (editingId) {

  await axios.put(
  `https://nirvify-backend.onrender.com/api/products/${editingId}`,
  data,
  {
    headers: {
      "Content-Type":
        "multipart/form-data",
    },
  }
);

} else {

  await axios.post(
  "https://nirvify-backend.onrender.com/api/products",
  data,
  {
    headers: {
      "Content-Type":
        "multipart/form-data",
    },
  }
);

}

        setMessage(
  editingId
    ? "Product Updated Successfully"
    : "Product Added Successfully"
);

setTimeout(() => {
  setMessage("");
}, 3000);
        fetchProducts();
        setEditingId(null);
        setFormData({
          name: "",
          price: "",
          category: "",
          colors:"",
          description: "",
        });

      } catch (error) {

        console.log(error);

      }

      

    };


    
  return (
    <div>

      <Navbar />
      {message && (
  <div className="toast-message">
    {message}
  </div>
)}

     <div className="admin-products-container">

        <div className="admin-products-card">

<h1 className="admin-products-title">
  {editingId
    ? "Update Product"
    : "Add Product"}
</h1>
        <form
  className="admin-products-form"
  onSubmit={handleSubmit}
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
  type="file"
  multiple
  accept="image/*"
  onChange={(e) =>
    setSelectedFiles(
      e.target.files
    )
  }
/>

          <br />
          <br />
        <input
  type="text"
  name="colors"
  placeholder="Available Colors (Optional) - Red, Blue, Green"
  value={
    formData.colors
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
            placeholder="Enter description points separated by |"
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
  className="product-submit-btn"
>
  {
    editingId
      ? "Update Product"
      : "Add Product"
  }
</button>

        </form>
        </div>

<hr
  style={{
    margin: "30px 0",
  }}
/>

<h2 className="product-list-title">
  Existing Products
</h2>

{products.length === 0 ? (

  <p>
    No Products Found
  </p>

) : (

  <div className="products-grid">

    {products.map(
      (product) => (

        <div
          key={product._id}
          className="product-card"
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

          <div className="product-actions">

            <button
              onClick={() =>
                editProduct(product)
              }
              style={{
                background: "#ffc107",
                color: "black",
                border: "none",
                padding: "8px 14px",
                borderRadius: "6px",
                cursor: "pointer",
                marginRight: "10px",
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
                background: "#dc3545",
                color: "white",
                border: "none",
                padding: "8px 14px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Delete Product
            </button>

          </div>

        </div>

      )
    )}

  </div>

)}
</div>
<Footer />

    </div>
  );
}

export default AdminProducts;