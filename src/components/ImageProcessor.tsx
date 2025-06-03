import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, Download, Sparkles } from "lucide-react";

export default function ImageProcessor() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="app-section" className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Upload Your Image
        </h2>
        <p className="text-lg text-gray-600">
          Drag and drop or click to select an image to get started
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <Card className="border-2 border-dashed border-gray-300 hover:border-purple-400 transition-colors">
            <CardContent className="p-8">
              <div
                className={`relative h-64 md:h-80 rounded-lg border-2 border-dashed transition-all duration-200 ${
                  dragActive
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {uploadedImage ? (
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Uploaded"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <Upload className="h-12 w-12 mb-4" />
                    <p className="text-lg font-medium mb-2">
                      Drop your image here
                    </p>
                    <p className="text-sm">or click to browse</p>
                    <p className="text-xs mt-2 text-gray-400">
                      Supports JPG, PNG, WebP
                    </p>
                  </div>
                )}
              </div>

              {uploadedImage && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Processing...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Result Area */}
          <Card className="border-2 border-gray-200">
            <CardContent className="p-8">
              <div className="h-64 md:h-80 rounded-lg bg-gray-50 border-2 border-gray-200 flex flex-col items-center justify-center">
                {uploadedImage ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                      <Sparkles className="h-8 w-8 text-purple-600 animate-pulse" />
                    </div>
                    <p className="text-gray-600">
                      AI is processing your image...
                    </p>
                    <p className="text-sm text-gray-500">
                      This usually takes a few seconds
                    </p>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                      <Download className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">
                      Processed image will appear here
                    </p>
                  </div>
                )}
              </div>

              {uploadedImage && (
                <div className="mt-6 flex gap-3">
                  <Button variant="outline" className="flex-1">
                    Preview
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
