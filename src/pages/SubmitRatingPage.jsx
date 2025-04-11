// src/pages/SubmitRatingPage.jsx
import { useState } from "react";
import axios from "axios";

function SubmitRatingPage({ storeId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://localhost:5000/user/submit-rating`,
        { storeId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Rating submitted!");
    } catch (err) {
      alert("Failed to submit rating");
    }
  };

  return (
    <form className="p-4 bg-gray-100 rounded" onSubmit={handleSubmit}>
      <label>Rating (1-5)</label>
      <input type="number" min={1} max={5} value={rating} onChange={(e) => setRating(e.target.value)} className="block w-full mb-2" />
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Leave a comment" className="w-full mb-2" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}

export default SubmitRatingPage;
