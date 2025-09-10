import React, { useState, useEffect } from "react";
import * as tmImage from "@teachablemachine/image";
import axios from "axios";

export default function ImageClassifier() {
  const [model, setModel] = useState(null);
  const [preview, setPreview] = useState(null);
  const [results, setResults] = useState([]);

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

  // Run prediction once image is ready
  const handlePredict = async () => {
    if (!model || !preview) return;

    const imgElement = document.getElementById("uploaded-image");
    const prediction = await model.predict(imgElement);
    const highest = prediction.reduce((prev, current) =>
      (prev.probability > current.probability) ? prev : current
    );
    console.log(highest)
    axios.post("http://localhost:3000/class-info", {
      pred: highest.className
    }).then(response => {
      console.log("Data sent successfully:", response.data);
    })
      .catch(error => {
        console.error("Error sending data:", error);
      });
    setResults(
      prediction.map((p) => ({
        className: p.className,
        probability: (p.probability * 100).toFixed(2),
      }))
    );
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-lg mx-auto shadow-lg rounded-2xl bg-white">
      <h1 className="text-xl font-bold mb-4">Teachable Machine Classifier</h1>

      {/* Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mb-4"
      />

      {/* Preview */}
      {preview && (
        <img
          id="uploaded-image"
          src={preview}
          alt="Preview"
          className="w-64 h-64 object-contain border mb-4"
          onLoad={handlePredict}
        />
      )}

      {/* Results */}
      <div className="w-full">
        {results.length > 0 && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="font-semibold mb-2">Prediction Results:</h2>
            {results.map((r, i) => (
              <p key={i}>
                {r.className}: <b>{r.probability}%</b>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
