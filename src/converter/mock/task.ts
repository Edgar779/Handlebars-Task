import { ITask } from "src/task/interface";

/** generate task template */
export function Task(tasks: ITask[]) {
  return {
    tasks
  };
}
