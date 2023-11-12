import { Injectable } from "@nestjs/common";
import { FilterQuery, Model } from "mongoose";
import { CreateTaskDTO, GetTaskQuery, TaskDTO } from "./dto";
import { ITask } from "./interface";
import { MongooseUtil } from "../util";
import { TaskSanitizer } from "./task.sanitizer";
import { TaskStatus } from "./task.constants";
import { TaskModel } from "./task.model";
import { ConverterService } from "src/converter/converter.service";

@Injectable()
export class TaskService {
  constructor(
    private readonly sanitizer: TaskSanitizer,
    private readonly converterService: ConverterService
  ) {
    this.mongooseUtil = new MongooseUtil();
    this.model = TaskModel;
  }

  //The Model
  private model: Model<ITask>;
  mongooseUtil: MongooseUtil;

  /************************** Service API *************************/
  /** Create a new task */
  async addTask(dto: CreateTaskDTO): Promise<TaskDTO> {
    let task: ITask = new this.model({
      name: dto.name,
      parameter: dto.parameter,
      status: TaskStatus.PENDING,
    });
    await task.save();
    return this.sanitizer.sanitize(task);
  }

  /** get queue status */
  async getQueue(dto: GetTaskQuery): Promise<string> {
    const query: FilterQuery<ITask> = {};
    if (dto.status) query.status = dto.status;
    const tasks = await this.model.find(query);
    const htmlContent = await this.converterService.taskData(tasks);
    return htmlContent;
  }

  /** process the queue */
  async processQueue(): Promise<void> {
    const tasks = [];
    const tasksPending = await this.model.find({ status: TaskStatus.PENDING });
    for (const task of tasksPending) {
      // Simulate asynchronous execution and task execution
      console.log(`Executing task ${task.id} - ${task.name}`);
      task.status = TaskStatus.COMPLETE;
      tasks.push(task.save());
    }
    await Promise.all(tasks);
  }
}
//End of Service
