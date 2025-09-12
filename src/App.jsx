import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Upload from "./components/Upload";
import ImageClassifier from "./components/imageClassifier.jsx";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

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


// 👇 Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <ImageClassifier /> }, 
      { path: "upload", element: <Upload /> },
      {path:"login",element:<Login />},      
      {path:"signUp",element:<SignUp />},      
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
