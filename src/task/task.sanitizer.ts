import { Injectable } from "@nestjs/common";
import { ISanitize } from "src/util";
import { TaskDTO } from "./dto";
import { ITask } from "./interface";

@Injectable()
export class TaskSanitizer implements ISanitize {
  sanitize(task: ITask): TaskDTO {
    const sanitized: TaskDTO = {
      id: task.id,
      name: task.name,
      parameter: task.parameter,
      status: task.status,
    };
    return sanitized;
  }

  sanitizeMany(tasks: ITask[]): TaskDTO[] {
    const sanitized: TaskDTO[] = [];
    for (let i = 0; i < tasks.length; i++) {
      sanitized.push(this.sanitize(tasks[i]));
    }
    return sanitized;
  }
}
