import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // ✅ Import toast provider
import NavBar from "./components/NavBar";
import Upload from "./components/Upload";
import ImageClassifier from "./components/imageClassifier"; 
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./components/AuthContext";
import Quiz from "./components/Quiz";
import Footer from "./components/Footer"

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      {/* Main content */}
      <div className="flex-1 w-full pt-16">
        <Outlet />
      </div>
      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <ImageClassifier /> },
      { path: "upload", element: <Upload /> },
      { path: "login", element: <Login /> },
      { path: "signUp", element: <SignUp /> },
      { path: "quiz/:category", element: <Quiz /> }, 
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      {/* 🔔 Toast notifications provider */}
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
