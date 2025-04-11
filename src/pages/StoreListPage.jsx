// src/pages/StoreListPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function StoreListPage() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function fetchStores() {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/user/stores", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStores(res.data);
    }
    fetchStores();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">All Stores</h1>
      <ul className="space-y-4">
        {stores.map((store) => (
          <li key={store.id} className="bg-white shadow-md p-4 rounded">
            <h2 className="text-xl font-semibold">{store.name}</h2>
            <p>{store.address}</p>
            <p>Rating: {parseFloat(store.rating).toFixed(2)}</p>
            {/* Optionally link to SubmitRatingPage */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StoreListPage;
