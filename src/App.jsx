import React from "react";
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./components/AuthContext";

// Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import Upload from "./components/Upload";
import ImageClassifier from "./components/imageClassifier";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Quiz from "./components/Quiz";

// --- Layout wrapper that knows current route ---
function AppLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      {!isHome && <NavBar />}

      {/* Main content fills available space */}
      <main className={`flex-grow w-full ${!isHome ? "pt-16" : ""}`}>
        <Outlet />
      </main>

      <Footer className="mt-auto" />
    </div>
  );
}

// --- Routes ---
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "classify", element: <ImageClassifier /> },
      { path: "upload", element: <Upload /> },
      { path: "login", element: <Login /> },
      { path: "signUp", element: <SignUp /> },
      { path: "quiz/:category", element: <Quiz /> },
    ],
  },
]);

// --- App ---
function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
