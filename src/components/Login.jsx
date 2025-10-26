import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { toast } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { email, password },
        { withCredentials: true }
      );

      toast.success(`${res.data.message}`);
      login(res.data.user);
      navigate("/classify");
    } catch (err) {
      console.error("Login failed:", err);
      if (err.response && err.response.data) {
        const errorMsg = err.response.data.error || "Something went wrong";
        toast.error(`${errorMsg}`);
      } else {
        toast.error("Network error, please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-y-auto">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-green-200 to-blue-100 animate-gradient-x" />

      {/* Floating Leaves */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-500"
            initial={{ y: Math.random() * 800, x: Math.random() * 1200, rotate: Math.random() * 360 }}
            animate={{ y: [-50, 850], rotate: 360 }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          >
            <Leaf className="h-5 w-5 opacity-70" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <header className="flex flex-col items-center justify-center py-8 px-4 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold mb-2 text-green-700 flex items-center gap-3 animate-pulse"
        >
          🔑 LOGIN
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-700 text-lg text-center max-w-3xl"
        >
          Sign in to access your recycling dashboard and track your waste disposal.
        </motion.p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 gap-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-300 flex flex-col items-center"
        >
          <h2 className="text-2xl mb-6 font-semibold text-gray-800">Welcome Back</h2>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-900 border border-gray-400 focus:outline-none focus:border-green-500 transition"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-900 border border-gray-400 focus:outline-none focus:border-green-500 transition"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-white bg-green-600 hover:bg-green-500 shadow-lg transition-all duration-300 transform disabled:opacity-50"
            >
              {loading ? "⏳ Logging in..." : "✅ Login"}
            </motion.button>
          </form>

          <p className="text-gray-700 mt-6 text-sm">
            Don’t have an account?{" "}
            <a href="/signUp" className="text-green-700 hover:underline">
              Sign Up
            </a>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
