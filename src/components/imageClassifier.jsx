import React, { useState, useEffect } from "react";
import * as tmImage from "@teachablemachine/image";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export default function ImageClassifier() {
  const [model, setModel] = useState(null);
  const [preview, setPreview] = useState(null);
  const [results, setResults] = useState(null);
  const [predictedClass, setPredictedClass] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const modelURL = "/model/model.json";
  const metadataURL = "/model/metadata.json";

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
      console.log("✅ Model loaded!");
    };
    loadModel();
  }, []);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setResults(null);
    setPredictedClass(null);
  };

  const handlePredict = async () => {
    if (!model || !preview) return;
    setLoading(true);

    try {
      const imgElement = document.getElementById("uploaded-image");
      const prediction = await model.predict(imgElement);

      const highest = prediction.reduce((prev, current) =>
        prev.probability > current.probability ? prev : current
      );
      setPredictedClass(highest.className);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/class-info`,
        { pred: highest.className },
        { withCredentials: true }
      );

      setResults(response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizRedirect = () => {
    if (!predictedClass) return;
    navigate(`/quiz/${predictedClass.toLowerCase()}`);
  };

  const getBadgeColor = (status) => {
    if (status === true) return "bg-green-600";
    if (status === false) return "bg-red-600";
    if (status === "special") return "bg-yellow-600";
    return "bg-gray-600";
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col text-gray-900">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-green-200 to-blue-100 animate-gradient-x" />

      {/* Floating Leaves */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
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
            <Leaf className="h-6 w-6 opacity-70" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <header className="flex flex-col items-center justify-center py-10 px-4 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold mb-3 text-green-700 flex items-center gap-3"
        >
          ♻️ Recyclify
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-700 text-lg text-center max-w-2xl"
        >
          AI-Powered Waste Analysis – Upload your item and get instant disposal guidance.
        </motion.p>
      </header>

      <main className="flex-1 flex flex-col md:flex-row items-center justify-evenly px-6 py-10 gap-10 relative z-10">
        {/* Upload Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-lg border border-gray-300 flex flex-col items-center"
        >
          <h2 className="text-xl mb-4 font-semibold text-gray-800">Upload Image</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="w-full border-2 border-dashed border-gray-400 rounded-xl p-5 text-center mb-6 cursor-pointer hover:border-green-500 transition"
          />

          {preview && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full h-72 bg-white/50 border border-gray-300 rounded-2xl flex items-center justify-center mb-5 overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img
                  id="uploaded-image"
                  src={preview}
                  alt="Preview"
                  className="object-contain h-full"
                />
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePredict}
                disabled={loading}
                className="px-8 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-500 shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "Analyze & Get Instructions"}
              </motion.button>
            </>
          )}
        </motion.div>

        {/* Results Card */}
        {results && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col w-full max-w-3xl gap-6"
          >
            <div className="flex justify-center">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className={`px-8 py-3 rounded-full text-white font-bold text-lg ${getBadgeColor(
                  results.recyclable
                )} shadow-lg`}
              >
                {results.recyclable === true
                  ? "RECYCLABLE"
                  : results.recyclable === false
                  ? "NOT RECYCLABLE"
                  : "SPECIAL DISPOSAL"}
              </motion.span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <InfoCard title="Item Details" color="text-green-700" text={results.pred} />
              <InfoCard title="Instructions" color="text-yellow-700" text={results.instructions} />
            </div>

            <InfoCard title="💡 Pro Tip" color="text-blue-700" text={results.tip} border="border-blue-500" />
            <InfoCard title="🌍 Environmental Impact" color="text-green-700" text={results.impact} border="border-green-500" />

            <div className="flex justify-center mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleQuizRedirect}
                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 shadow-lg transition-all duration-300"
              >
                Take {predictedClass} Quiz
              </motion.button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

function InfoCard({ title, color, text, border }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-xl border ${border || "border-gray-300"} transition-transform duration-300`}
    >
      <h3 className={`font-semibold mb-3 text-lg ${color}`}>{title}</h3>
      <p className="text-gray-800">{text}</p>
    </motion.div>
  );
}
