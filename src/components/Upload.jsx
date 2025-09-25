import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { toast } from 'react-hot-toast';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Please select an image first");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      const imageUrl = cloudinaryRes.data.secure_url;

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const latitude = pos.coords.latitude;
            const longitude = pos.coords.longitude;
            const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ latitude, longitude, image: imageUrl }),
              credentials: "include",
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Upload failed on server");

            toast.success(`${data.message}`);
          } catch (err) {
            console.error("Backend upload failed:", err);
            toast.error(`${err.message || "Upload failed on server"}`);
          } finally {
            setLoading(false);
          }
        },
        (geoErr) => {
          console.error("Geolocation error:", geoErr);
          toast.error("Failed to get location");
          setLoading(false);
        }
      );
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      toast.error(`${err.response?.data?.error || "Upload to Cloudinary failed"}`);
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-y-auto">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-green-200 to-blue-100 animate-gradient-x" />

      {/* Floating Leaves */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-500"
            initial={{ y: Math.random() * 800, x: Math.random() * 1200, rotate: Math.random() * 360 }}
            animate={{ y: [-50, 850], rotate: 360 }}
            transition={{ duration: 10 + Math.random() * 5, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
          >
            <Leaf className="h-5 w-5 opacity-70" />
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <header className="flex flex-col items-center justify-center py-8 px-4 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold mb-2 text-green-700 flex items-center gap-3 animate-pulse"
        >
          ♻️ RECYCLE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-700 text-lg text-center max-w-3xl"
        >
          AI-Powered Waste Analysis & Recycling Intelligence – Upload your item and get instant disposal guidance.
        </motion.p>
      </header>

      {/* Upload Card */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 gap-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-lg border border-gray-300 flex flex-col items-center"
        >
          <h2 className="text-xl mb-4 font-semibold text-gray-800">Upload Image</h2>

          <label className="w-full border-2 border-dashed border-gray-400 rounded-xl p-5 text-center mb-6 cursor-pointer hover:border-green-500 transition-all duration-300 bg-gray-100 text-gray-900">
            <span className="block">Choose file</span>
            <input type="file" onChange={handleFileChange} accept="image/*" className="hidden" />
          </label>

          {preview && (
            <div className="w-full h-72 bg-black border border-gray-700 rounded-2xl flex items-center justify-center mb-5 overflow-hidden hover:scale-105 transition-transform duration-300">
              <img src={preview} alt="preview" className="object-contain h-full" />
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUpload}
            disabled={loading}
            className="w-full px-8 py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform disabled:opacity-50"
          >
            {loading ? "⏳ Processing..." : "✅ Apply for Recycle"}
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
};

export default Upload;
