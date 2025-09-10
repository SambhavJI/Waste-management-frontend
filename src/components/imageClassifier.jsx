import React, { useState, useEffect } from "react";
import * as tmImage from "@teachablemachine/image";
import axios from "axios";

export default function ImageClassifier() {
  const [model, setModel] = useState(null);
  const [preview, setPreview] = useState(null);
  const [results, setResults] = useState(null);

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

  // Handle file upload
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  // Run prediction
  const handlePredict = async () => {
    if (!model || !preview) return;

    const imgElement = document.getElementById("uploaded-image");
    const prediction = await model.predict(imgElement);

    const highest = prediction.reduce((prev, current) =>
      prev.probability > current.probability ? prev : current
    );

    console.log("Highest prediction:", highest);

    axios
      .post("http://localhost:3000/class-info", {
        pred: highest.className,
      })
      .then((response) => {
        setResults(response.data);
        console.log("Data sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  // Badge color
  const getBadgeColor = (status) => {
    if (status === true) return "bg-green-600";
    if (status === false) return "bg-red-600";
    if (status === "special") return "bg-yellow-600";
    return "bg-gray-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center py-10">
      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-2 text-green-400 flex items-center gap-2">
        ♻️ RECYCLE
      </h1>
      <p className="mb-8 text-gray-400 text-sm">
        AI-Powered Waste Analysis & Recycling Intelligence
      </p>

      {/* Upload Card */}
      <div className="bg-neutral-900 p-6 rounded-2xl shadow-lg w-full max-w-xl">
        <h2 className="text-sm mb-2 text-gray-300">Upload Image</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="w-full border-2 border-dashed border-gray-600 rounded-md p-4 text-center mb-4 cursor-pointer hover:border-green-400 transition"
        />

        {/* Preview */}
        {preview && (
          <div className="flex flex-col items-center">
            <h2 className="text-sm mb-2 text-gray-300">Preview</h2>
            <div className="w-full max-w-md h-64 bg-black border border-gray-700 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
              <img
                id="uploaded-image"
                src={preview}
                alt="Preview"
                className="object-contain h-full"
              />
            </div>
            <button
              onClick={handlePredict}
              className="px-6 py-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition"
            >
              Analyze & Get Instructions
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      {results && (
        <div className="w-full max-w-4xl mt-10 space-y-6">
          {/* Status Badge */}
          <div className="flex justify-center">
            <span
              className={`px-6 py-2 rounded-full text-white font-bold ${getBadgeColor(
                results.recyclable
              )}`}
            >
              {results.recyclable === true
                ? "RECYCLABLE"
                : results.recyclable === false
                ? "NOT RECYCLABLE"
                : "SPECIAL DISPOSAL"}
            </span>
          </div>

          {/* Item Details + Instructions */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold mb-3 text-green-300">
                Item Details
              </h3>
              <p>
                <strong>Category:</strong> {results.pred}
              </p>
            </div>
            <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold mb-3 text-yellow-300">
                Instructions
              </h3>
              <p>{results.instructions}</p>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="bg-blue-900 p-6 rounded-lg shadow-lg border-l-4 border-blue-400">
            <h3 className="font-semibold mb-2">💡 Pro Tip</h3>
            <p>{results.tip}</p>
          </div>

          {/* Environmental Impact */}
          <div className="bg-green-900 p-6 rounded-lg shadow-lg border-l-4 border-green-400">
            <h3 className="font-semibold mb-2">🌍 Environmental Impact</h3>
            <p>{results.impact}</p>
          </div>
        </div>
      )}
    </div>
  );
}
