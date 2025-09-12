import { useState } from "react";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post("http://localhost:3000/login", {
                email,
                password,
            },{ withCredentials: true });
            alert("✅ Login successful!");
            console.log(res.data);
        } catch (err) {
            console.error("Login failed:", err);
            alert("❌ Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col overflow-y-auto">
            {/* Header */}
            <header className="flex flex-col items-center justify-center py-8 px-4 bg-black/20 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
                <h1 className="text-5xl font-extrabold mb-2 text-green-400 flex items-center gap-3 animate-pulse">
                    🔑 LOGIN
                </h1>
                <p className="text-gray-400 text-lg text-center max-w-3xl">
                    Sign in to access your recycling dashboard and track your waste
                    disposal.
                </p>
            </header>

            {/* Main */}
            <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 gap-10 w-full">
                {/* Login Card */}
                <div className="bg-neutral-900 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-700 flex flex-col items-center">
                    <h2 className="text-2xl mb-6 font-semibold text-gray-200">
                        Welcome Back
                    </h2>

                    <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-gray-800 text-gray-200 border border-gray-600 focus:outline-none focus:border-green-400 transition"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-gray-800 text-gray-200 border border-gray-600 focus:outline-none focus:border-green-400 transition"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl font-bold text-black 
              bg-green-500 hover:bg-green-400 
              shadow-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50"
                        >
                            {loading ? "⏳ Logging in..." : "✅ Login"}
                        </button>
                    </form>

                    <p className="text-gray-400 mt-6 text-sm">
                        Don’t have an account?{" "}
                        <a href="/signUp" className="text-green-400 hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>
            </main>
        </div>
    );
}
