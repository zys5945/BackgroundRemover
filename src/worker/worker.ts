import { ImageSegmentationPipeline, pipeline } from "@huggingface/transformers";

import { type WorkerInputData, type WorkerOutputMessage } from "./types";

let SEGMENTER: ImageSegmentationPipeline | null = null;
const CANVAS = new OffscreenCanvas(0, 0);

function sendMessage(message: WorkerOutputMessage) {
  self.postMessage(message);
}

async function initSegmenter(
  taskId: number
): Promise<ImageSegmentationPipeline> {
  if (SEGMENTER === null) {
    SEGMENTER = await pipeline("image-segmentation", "briaai/RMBG-1.4", {
      dtype: "fp32",
      progress_callback(progress) {
        if (progress.status === "progress") {
          sendMessage({
            taskId,
            type: "progress",
            progress: progress.progress,
          });
        } else if (progress.status === "ready") {
          sendMessage({
            taskId,
            type: "progress",
            progress: 100,
          });
        }
      },
    });
  }
  return SEGMENTER;
}

async function segment(file: File, taskId: number) {
  // draw to canvas
  const imgBitmap = await createImageBitmap(file);
  CANVAS.width = imgBitmap.width;
  CANVAS.height = imgBitmap.height;
  const ctx = CANVAS.getContext("2d");
  if (ctx === null) {
    throw new Error("Browser doesn't support 2d canvas context");
  }
  ctx.drawImage(imgBitmap, 0, 0);

  // run model
  const segmenter = await initSegmenter(taskId);
  const mask = (await segmenter(CANVAS))[0].mask;
  const maskData = mask.data;

  // get image data
  const imgData = ctx.getImageData(0, 0, CANVAS.width, CANVAS.height);

  // apply mask
  for (let i = 0; i < maskData.length; i++) {
    if (maskData[i] < 0.5) {
      imgData.data[i * 4 + 3] = 0;
    }
  }

  // write masked image back to context and convert it to data url
  ctx.putImageData(imgData, 0, 0);
  const blob = await CANVAS.convertToBlob({ type: "image/png", quality: 1 });
  const dataURL = URL.createObjectURL(blob);

  sendMessage({
    taskId,
    type: "result",
    img: dataURL,
  });
}

onmessage = (e: MessageEvent<WorkerInputData>) => {
  if (e.data == null) {
    return;
  }

  const inputData = e.data;

  segment(inputData.file, inputData.taskId).catch((e) => {
    sendMessage({
      taskId: inputData.taskId,
      type: "error",
      error: e.message,
    });
  });
};
