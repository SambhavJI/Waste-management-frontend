import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Upload from "./components/Upload";
import ImageClassifier from "./components/imageClassifier"; 
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./components/AuthContext";
import Quiz from "./components/Quiz";

function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="w-full mt-0 pt-0">
        <Outlet />
      </div>
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
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
