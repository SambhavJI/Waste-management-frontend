import { useState } from "react";
import axios from "axios";

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
    if (!file) return alert("Please select an image first");
    setLoading(true);

    try {
      // Upload to Cloudinary
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
          const latitude = pos.coords.latitude;
          const longitude = pos.coords.longitude;

          await axios.post("http://localhost:3000/upload", {
            latitude,
            longitude,
            image: imageUrl,
          },{ withCredentials: true }  );

          alert("Info uploaded successfully ✅");
          setLoading(false);
        },
        (err) => {
          console.error("Geolocation error:", err);
          alert("Failed to get location");
          setLoading(false);
        }
      );
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check console for details.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col overflow-y-auto">
      {/* Header */}
      <header className="flex flex-col items-center justify-center py-8 px-4 bg-black/20 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
        <h1 className="text-5xl font-extrabold mb-2 text-green-400 flex items-center gap-3 animate-pulse">
          ♻️ RECYCLE
        </h1>
        <p className="text-gray-400 text-lg text-center max-w-3xl">
          AI-Powered Waste Analysis & Recycling Intelligence – Upload your item
          and get instant disposal guidance.
        </p>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 gap-10 w-full">
        {/* Upload Card */}
        <div className="bg-neutral-900 p-8 rounded-3xl shadow-2xl w-full max-w-lg border border-gray-700 flex flex-col items-center">
          <h2 className="text-xl mb-4 font-semibold text-gray-300">
            Upload Image
          </h2>

          <label className="w-full border-2 border-dashed border-gray-600 rounded-xl p-5 text-center mb-6 cursor-pointer hover:border-green-400 transition-all duration-300 bg-gray-800 text-gray-200">
            <span className="block">Choose file</span>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </label>

          {/* Preview */}
          {preview && (
            <div className="w-full h-72 bg-black border border-gray-700 rounded-2xl flex items-center justify-center mb-5 overflow-hidden hover:scale-105 transition-transform duration-300">
              <img
                src={preview}
                alt="preview"
                className="object-contain h-full"
              />
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full px-8 py-3 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 shadow-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50"
          >
            {loading ? "⏳ Processing..." : "✅ Apply for Recycle"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Upload;
