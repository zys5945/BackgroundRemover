export interface WorkerInputData {
  taskId: number;
  file: File;
}

export type WorkerOutputMessage = { taskId: number } & (
  | {
      type: "result";
      img: string; // data url
    }
  | {
      type: "progress";
      progress: number;
    }
  | {
      type: "error";
      error: string;
    }
);
