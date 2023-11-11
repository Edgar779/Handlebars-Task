import { Document } from "mongoose";
import { TaskStatus } from "../task.constants";

export interface ITask extends Document {
  name: string;
  parameter: string;
  status: TaskStatus;
}
