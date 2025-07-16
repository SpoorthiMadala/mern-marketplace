import { useState } from "react";
import API from "../api";

export default function ProductForm({ onProductAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    type: "sale",
    image: null,
  });
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUploading(true);

    try {
      // 1. Upload image to backend
      const imgData = new FormData();
      imgData.append("image", formData.image);
      const imgRes = await API.post("/upload", imgData);
      const imageUrl = imgRes.data.imageUrl;

      // 2. Create product
      const res = await API.post("/products", {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        type: formData.type,
        imageUrl,
      });

      onProductAdded(res.data); // notify parent
      setFormData({ title: "", description: "", price: "", type: "sale", image: null });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-4">
      <h2 className="text-lg font-bold mb-2">Post a Product</h2>
      <input name="title" placeholder="Title" className="block w-full mb-2 p-2 border rounded" value={formData.title} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" className="block w-full mb-2 p-2 border rounded" value={formData.description} onChange={handleChange} />
      <input name="price" type="number" placeholder="Price" className="block w-full mb-2 p-2 border rounded" value={formData.price} onChange={handleChange} required />
      <select name="type" className="block w-full mb-2 p-2 border rounded" value={formData.type} onChange={handleChange}>
        <option value="sale">For Sale</option>
        <option value="rent">For Rent</option>
      </select>
      <input name="image" type="file" accept="image/*" className="mb-2" onChange={handleChange} required />
      <button disabled={uploading} className="bg-indigo-600 text-white px-4 py-2 rounded">
        {uploading ? "Uploading..." : "Post Product"}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
}
