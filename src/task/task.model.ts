import { Schema, model } from "mongoose";
import { ITask } from "./interface";
import { TaskStatus } from "./task.constants";

const TaskSchema = new Schema(
  {
    name: { type: String },
    parameter: { type: String },
    status: { type: String, enum: [TaskStatus] },
  },
  { timestamps: true }
);

export const TaskModel = model<ITask>("task", TaskSchema);
