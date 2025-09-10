import React, { useState, useEffect } from "react";
import * as tmImage from "@teachablemachine/image";
import axios from "axios";
import { Upload, Camera, Recycle, Lightbulb, Globe, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export default function ImageClassifier() {
  const [model, setModel] = useState(null);
  const [preview, setPreview] = useState(null);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

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

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreview(url);
      }
    }
  };

  // Run prediction
  const handlePredict = async () => {
    if (!model || !preview) return;

    setIsLoading(true);

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
        setIsLoading(false);
        console.log("Data sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
        setIsLoading(false);
      });
  };

  // Badge color
  const getBadgeColor = (status) => {
    if (status === true) return "bg-emerald-500";
    if (status === false) return "bg-red-500";
    if (status === "special") return "bg-amber-500";
    return "bg-gray-500";
  };

  // Status text
  const getStatusText = (status) => {
    if (status === true) return "RECYCLABLE";
    if (status === false) return "NOT RECYCLABLE";
    if (status === "special") return "SPECIAL DISPOSAL";
    return "UNKNOWN";
  };

  // Status icon
  const getStatusIcon = (status) => {
    if (status === true) return CheckCircle;
    if (status === false) return XCircle;
    return AlertTriangle;
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-800">
      {/* Background animation */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent animate-pulse"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen py-12 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-emerald-500/20 rounded-2xl backdrop-blur-sm">
              <Recycle className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 bg-clip-text text-transparent">
              EcoScan AI
            </h1>
          </div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Advanced AI-powered waste classification and recycling guidance system
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-slate-800/60 rounded-full text-sm text-slate-300 backdrop-blur-sm">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            {model ? "AI Model Ready" : "Loading AI Model..."}
          </div>
        </div>

        {/* Upload Section */}
        <div className="w-full max-w-2xl mb-8">
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
            <div
              className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
                dragActive
                  ? "border-emerald-400 bg-emerald-400/5"
                  : "border-slate-600 hover:border-emerald-500/50 hover:bg-slate-700/20"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {!preview && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              )}

              {!preview ? (
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-200 mb-2">
                    Drop your image here
                  </h3>
                  <p className="text-slate-400 mb-4">
                    or click to browse your files
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                    <Camera className="w-4 h-4" />
                    Supports JPG, PNG, WebP
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <img
                      id="uploaded-image"
                      src={preview}
                      alt="Preview"
                      className="max-w-full max-h-64 rounded-xl shadow-lg"
                    />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <button
                    onClick={handlePredict}
                    disabled={isLoading || !model}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mr-4"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Recycle className="w-5 h-5" />
                        Analyze Item
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setPreview(null);
                      setResults(null);
                      setIsLoading(false);
                    }}
                    className="inline-flex items-center gap-3 px-6 py-4 bg-slate-700 text-white font-semibold rounded-2xl shadow-lg hover:bg-slate-600 transition-all duration-300"
                  >
                    <Upload className="w-5 h-5" />
                    New Image
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        {results && (
          <div className="w-full max-w-6xl space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            {/* Status Badge */}
            <div className="flex justify-center">
              <div
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl shadow-lg ${getBadgeColor(
                  results.recyclable
                )}`}
              >
                {React.createElement(getStatusIcon(results.recyclable), {
                  className: "w-6 h-6 text-white",
                })}
                <span className="font-bold text-white text-lg">
                  {getStatusText(results.recyclable)}
                </span>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Item Details */}
              <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-500/20 rounded-xl">
                    <Camera className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-200">
                    Classification Result
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl">
                    <span className="text-slate-400">Detected Item</span>
                    <span className="font-semibold text-slate-200 text-lg">
                      {results.pred}
                    </span>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/20 rounded-xl">
                    <Recycle className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-200">
                    Disposal Instructions
                  </h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {results.instructions}
                </p>
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Pro Tip */}
              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 backdrop-blur-xl rounded-2xl p-8 border border-amber-500/20 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-amber-500/20 rounded-xl">
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-200">Pro Tip</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">{results.tip}</p>
              </div>

              {/* Environmental Impact */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/5 backdrop-blur-xl rounded-2xl p-8 border border-emerald-500/20 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-500/20 rounded-xl">
                    <Globe className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-200">
                    Environmental Impact
                  </h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {results.impact}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
