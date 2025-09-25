import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { motion } from "framer-motion";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg shadow-md 
                 bg-gradient-to-r from-green-500/80 via-teal-500/70 to-blue-500/80"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-white tracking-wide">
          ♻ Recyclify
        </Link>

        {/* Links (Desktop) */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/upload" label="Recycle" />
          <NavLink to="/" label="Info" />
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold
                         hover:bg-red-600 transition duration-300 shadow-md"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-2 rounded-xl bg-white/20 text-white font-semibold
                                   hover:bg-white/40 transition duration-300 shadow-md">
                  Login
                </button>
              </Link>
              <Link to="/signUp">
                <button className="px-4 py-2 rounded-xl bg-yellow-400 text-black font-semibold
                                   hover:bg-yellow-300 transition duration-300 shadow-md">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

function NavLink({ to, label }) {
  return (
    <Link
      to={to}
      className="relative text-white font-medium tracking-wide hover:text-yellow-300 transition duration-300"
    >
      {label}
      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-300 transition-all duration-300 hover:w-full"></span>
    </Link>
  );
}
