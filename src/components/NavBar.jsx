import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/upload" className="btn btn-primary w-full">
                Recycle
              </Link>
            </li>
            <li>
              <Link to="/" className="btn btn-secondary w-full">
                Info
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          Recyclify
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex gap-2">
        <Link to="/upload" className="btn btn-primary">
          Recycle
        </Link>
        <Link to="/" className="btn btn-secondary">
          Info
        </Link>
      </div>

      <div className="navbar-end flex gap-2">
        {user ? (
          <button
            className="btn btn-error"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
            <Link to="/signUp">
              <button className="btn">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
