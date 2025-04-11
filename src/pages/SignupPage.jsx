// src/pages/SignupPage.jsx
import { useState } from "react";
import axios from "axios";

function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", address: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/signup", form);
      alert("Signup successful! Please login.");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        <input type="text" placeholder="Name" className="w-full p-2 border mb-4" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="email" placeholder="Email" className="w-full p-2 border mb-4" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="text" placeholder="Address" className="w-full p-2 border mb-4" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
        <input type="password" placeholder="Password" className="w-full p-2 border mb-4" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupPage;
