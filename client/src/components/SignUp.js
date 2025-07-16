import { useState } from "react";
import API from "../api";

export default function SignUp({ onAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/signup", { email, password });
      localStorage.setItem("token", res.data.token);
      onAuth(res.data.email);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        className="block mb-2 p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="block mb-2 p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="bg-green-600 text-white p-2 rounded">Sign Up</button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
}
