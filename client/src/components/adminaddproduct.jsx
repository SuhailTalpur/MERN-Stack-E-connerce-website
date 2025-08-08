import React, { useState, useEffect } from "react";
import axios from "axios";

function AddProduct() {
  const sizeOptions = ["SM", "M", "L", "XL"];

  const [form, setForm] = useState({
    name: "",
    description: "",
    stock: 0,
    price: 0,
    size: [],
    category: "",
    subcategory: "",
    section: "",
  });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    fetchProducts();
  }, []);


  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      setProducts([]);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => {
      if (checked) {
        return { ...prev, size: [...prev.size, value] };
      } else {
        return { ...prev, size: prev.size.filter((sz) => sz !== value) };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) {
      if (key === "size") {
        form.size.forEach((sz) => formData.append("size", sz));
      } else {
        formData.append(key, form[key]);
      }
    }
    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      const res = await axios.post("http://localhost:5000/api/products/add-product", formData);
      alert("Product added successfully!");

      // Reset form and previews
      setForm({
        name: "",
        description: "",
        stock: 0,
        price: 0,
        size: "",
        category: "",
        subcategory: "",
        section: "",
      });
      setImages([]);
      setPreviews([]);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Error uploading product");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert("Error deleting product");
    }
  };

  return (
    <div>
      <h1 className="text-white font-medium text-xl text-center my-10">Add Products</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center" encType="multipart/form-data">
        {/* Product Fields */}
        <div className="mb-6 sm:w-96">
          <label className="block mb-2 text-sm font-normal text-white">Product Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="input" required />
        </div>
        <div className="mb-6 sm:w-96">
          <label className="block mb-2 text-sm font-normal text-white">Description</label>
          <input name="description" value={form.description} onChange={handleChange} className="input" required />
        </div>
        <div className="mb-6 sm:w-96">
          <label className="block mb-2 text-sm font-normal text-white">Stock</label>
          <input name="stock" type="number" value={form.stock} onChange={handleChange} className="input" required />
        </div>
        <div className="mb-6 sm:w-96">
          <label className="block mb-2 text-sm font-normal text-white">Price</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} className="input" required />
        </div>
        <div className="mb-6 sm:w-96 min-w-46">
          <label className="block mb-2 text-sm font-normal text-white">Size</label>
          <div className="flex gap-4">
            {sizeOptions.map((sz) => (
              <label key={sz} className="text-white flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  value={sz}
                  checked={form.size.includes(sz)}
                  onChange={handleSizeChange}
                  className="accent-purple-500"
                  
                />
                {sz}
              </label>
            ))}
          </div>
        </div>
        <div className="mb-6 sm:w-96 min-w-46">
          <label className="block mb-2 text-sm font-normal text-white">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="input" required>
            <option value="">Choose a Category</option>
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
        </div>
        <div className="mb-6 sm:w-96 min-w-46">
          <label className="block mb-2 text-sm font-normal text-white">Subcategory</label>
          <select name="subcategory" value={form.subcategory} onChange={handleChange} className="input" required>
            <option value="">Choose a SubCategory</option>
            <option>Hoodie</option>
            <option>Seatshirt</option>
            <option>T-Shirt</option>
            <option>Jeans</option>
            <option>Jacket</option>
          </select>
        </div>
        <div className="mb-6 sm:w-96 min-w-46">
          <label className="block mb-2 text-sm font-normal text-white">Section</label>
          <select name="section" value={form.section} onChange={handleChange} className="input" required>
            <option value="">Choose a Section</option>
            <option>Trending</option>
            <option>New Arrival</option>
            <option>Sale</option>
            <option>Popular</option>
          </select>
        </div>

        {/* Image Upload and Preview */}
        <div className="mb-6 sm:w-96">
          <label className="block mb-2 text-sm font-normal text-white">Upload Images</label>
          <input type="file" multiple onChange={handleImageChange} className="input cursor-pointer"/>
          {previews.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {previews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Preview ${idx}`}
                  className="w-20 h-20 object-cover rounded-md border border-gray-300"
                />
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg mb-10 cursor-pointer">
          Add Product
        </button>
      </form>

      <h1 className="text-white font-medium text-xl text-center my-10">All Products</h1>
      <table className="table-auto bg-gray-600 text-white w-full mb-13">
        <thead className="bg-purple-500">
          <tr>
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Description</th>
            <th className="p-2 border border-gray-300">Stock</th>
            <th className="p-2 border border-gray-300">Price</th>
            <th className="p-2 border border-gray-300">Size</th>
            <th className="p-2 border border-gray-300">Category</th>
            <th className="p-2 border border-gray-300">Subcategory</th>
            <th className="p-2 border border-gray-300">Section</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-700">
                <td className="p-2 border border-gray-500 max-w-12">{product.name}</td>
                <td className="p-2 border border-gray-500 max-w-12">{product.description}</td>
                <td className="p-2 border border-gray-500 max-w-12">{product.stock}</td>
                <td className="p-2 border border-gray-500 max-w-12">${product.price}</td>
                <td className="p-2 border border-gray-500 max-w-12">
                  {Array.isArray(product.size) ? product.size.join(", ") : product.size}
                </td>
                <td className="p-2 border border-gray-500 max-w-12">{product.category}</td>
                <td className="p-2 border border-gray-500 max-w-12">{product.subcategory}</td>
                <td className="p-2 border border-gray-500 max-w-12">{product.section}</td>
                <td className="p-2 border border-gray-500 max-w-12">
                  <button
                    className="p-1 cursor-pointer hover:text-gray-300 text-red-500 font-medium"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center p-4">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AddProduct;
