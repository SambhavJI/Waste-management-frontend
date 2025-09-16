import React, { useState, useEffect } from "react";
import * as tmImage from "@teachablemachine/image";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      console.log("📊 Prediction:", highest);

      setPredictedClass(highest.className);

      const response = await axios.post(
        "http://localhost:3000/class-info",
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
    if (!predictedClass) {
      alert("Please analyze an image first!");
      return;
    }
    navigate(`/quiz/${predictedClass.toLowerCase()}`);
  };

  const getBadgeColor = (status) => {
    if (status === true) return "bg-green-600";
    if (status === false) return "bg-red-600";
    if (status === "special") return "bg-yellow-600";
    return "bg-gray-600";
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col overflow-y-auto">
      {/* Header */}
      <header className="flex flex-col items-center justify-center py-8 px-4 bg-black/20 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
        <h1 className="text-5xl font-extrabold mb-2 text-green-400 flex items-center gap-3 animate-pulse">
          ♻️ RECYCLE
        </h1>
        <p className="text-gray-400 text-lg text-center max-w-3xl">
          AI-Powered Waste Analysis & Recycling Intelligence – Upload your item and get instant disposal guidance.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-evenly px-6 py-10 gap-10 w-full">
        {/* Upload Card */}
        <div className="bg-neutral-900 p-8 rounded-3xl shadow-2xl w-full max-w-lg border border-gray-700 flex flex-col items-center">
          <h2 className="text-xl mb-4 font-semibold text-gray-300">
            Upload Image
          </h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="w-full border-2 border-dashed border-gray-600 rounded-xl p-5 text-center mb-6 cursor-pointer hover:border-green-400 transition-all duration-300 bg-gray-800 text-gray-200"
          />

          {/* Preview + Analyze Button */}
          {preview && (
            <>
              <div className="w-full h-72 bg-black border border-gray-700 rounded-2xl flex items-center justify-center mb-5 overflow-hidden hover:scale-105 transition-transform duration-300">
                <img
                  id="uploaded-image"
                  src={preview}
                  alt="Preview"
                  className="object-contain h-full"
                />
              </div>
              <button
                onClick={handlePredict}
                disabled={loading}
                className="px-8 py-3 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 shadow-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "Analyze & Get Instructions"}
              </button>
            </>
          )}
        </div>

        {/* Results Card */}
        {results && (
          <div className="flex-1 flex flex-col w-full max-w-3xl gap-6">
            <div className="flex justify-center">
              <span
                className={`px-8 py-3 rounded-full text-white font-bold text-lg ${getBadgeColor(
                  results.recyclable
                )} shadow-lg`}
              >
                {results.recyclable === true
                  ? "RECYCLABLE"
                  : results.recyclable === false
                  ? "NOT RECYCLABLE"
                  : "SPECIAL DISPOSAL"}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-neutral-800 p-6 rounded-2xl shadow-xl border border-gray-700 hover:scale-105 transition-transform duration-300">
                <h3 className="font-semibold mb-3 text-green-300 text-lg">
                  Item Details
                </h3>
                <p>
                  <strong>Category:</strong> {results.pred}
                </p>
              </div>
              <div className="bg-neutral-800 p-6 rounded-2xl shadow-xl border border-gray-700 hover:scale-105 transition-transform duration-300">
                <h3 className="font-semibold mb-3 text-yellow-300 text-lg">
                  Instructions
                </h3>
                <p>{results.instructions}</p>
              </div>
            </div>

            <div className="bg-blue-900 p-6 rounded-2xl shadow-xl border-l-4 border-blue-400 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="font-semibold mb-2 text-lg">💡 Pro Tip</h3>
              <p>{results.tip}</p>
            </div>

            <div className="bg-green-900 p-6 rounded-2xl shadow-xl border-l-4 border-green-400 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="font-semibold mb-2 text-lg">🌍 Environmental Impact</h3>
              <p>{results.impact}</p>
            </div>

            {/* Take Quiz Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleQuizRedirect}
                className="px-8 py-3 bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-400 shadow-lg transition-all duration-300"
              >
                Take {predictedClass} Quiz
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
