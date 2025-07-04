import { type WorkerOutputMessage } from "@/worker/types";
import Worker from "@/worker/worker?worker";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Download, Sparkles, Upload } from "lucide-react";
import { default as React, useState } from "react";
import { Spinner } from "./ui/spinner";

let TASK_ID = 0;

export default function ImageProcessor() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadImageName, setUploadImageName] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const worker = new Worker();
  worker.onmessage = (e: MessageEvent<WorkerOutputMessage>) => {
    if (e.data.taskId !== TASK_ID) {
      return;
    }

    if (e.data.type === "result") {
      setResultImage(e.data.img);
    } else if (e.data.type === "progress") {
      setProgress(e.data.progress);
    } else if (e.data.type === "error") {
      setError(e.data.error);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave" || e.type === "dragend") {
      setDragActive(false);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const processFile = async (file: File) => {
    // remove old images and set new ones
    if (uploadedImage !== null) {
      URL.revokeObjectURL(uploadedImage);
    }
    setUploadedImage(URL.createObjectURL(file));
    setUploadImageName(file.name);

    if (resultImage !== null) {
      URL.revokeObjectURL(resultImage);
      setResultImage(null);
    }

    // submit task to worker
    const taskId = ++TASK_ID;
    worker.postMessage({ taskId, file });
  };

  const previewResult = () => {
    if (resultImage !== null) {
      window.open(resultImage);
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
                className={`relative ${
                  !uploadedImage && "min-h-64 md:min-h-80"
                } rounded-lg border-2 border-dashed transition-all duration-200 ${
                  dragActive
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrag}
              >
                {uploadedImage ? (
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Uploaded"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center h-full text-gray-500">
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

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              {uploadedImage && (
                <div className="mt-4 space-y-3">
                  {(error && <span>Error: {error}</span>) ||
                    (progress !== 100 && (
                      <React.Fragment>
                        <div className="flex items-center justify-between text-lg text-gray-600">
                          <span>Initializing...</span>
                          <span>{progress.toFixed(2)}%</span>
                        </div>
                        <Progress value={progress} className="w-full" />
                      </React.Fragment>
                    )) ||
                    (!resultImage && (
                      <div className="flex items-center justify-between text-lg text-gray-600">
                        <span>Processing...</span>
                        <Spinner />
                      </div>
                    )) ||
                    (resultImage && (
                      <span className="table mx-auto mt-6 text-lg text-green-600 font-bold">
                        Completed!
                      </span>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Result Area */}
          <Card className="border-2 border-gray-200">
            <CardContent className="p-8 h-full flex flex-col">
              <div
                className={`flex-1 rounded-lg bg-gray-50 border-2 border-gray-200 flex flex-col items-center justify-center ${
                  !resultImage && "py-4"
                }`}
              >
                {!uploadedImage && (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                      <Download className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">
                      Processed image will appear here
                    </p>
                  </div>
                )}

                {uploadedImage && !resultImage && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                      <Sparkles className="h-8 w-8 text-purple-600 animate-pulse" />
                    </div>
                    <p className="text-gray-600 mt-8">
                      AI is processing your image...
                    </p>
                    <p className="text-gray-600 mt-4">
                      This will take a minute. Longer if not initialized
                    </p>
                  </div>
                )}

                {resultImage && (
                  <img
                    src={resultImage}
                    alt="Result"
                    className="object-cover rounded-lg"
                  />
                )}
              </div>

              {uploadedImage && (
                <div className="mt-6 flex gap-3">
                  <Button
                    variant="outline"
                    className={`flex-1 ${
                      resultImage ? "cursor-pointer" : "cursor-not-allowed"
                    }`}
                    disabled={!resultImage}
                    onClick={previewResult}
                  >
                    Preview
                  </Button>
                  <Button
                    className={`flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 cusor-pointer ${
                      resultImage ? "cursor-pointer" : "cursor-not-allowed"
                    }`}
                    disabled={!resultImage}
                    asChild
                  >
                    <a
                      href={resultImage!}
                      download={
                        uploadImageName?.replace(/\.[^/.]+$/, "") +
                        "-output.png"
                      }
                    >
                      <Download />
                      Download
                    </a>
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
