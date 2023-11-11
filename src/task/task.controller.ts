import { Body, Controller, Post, Get, Query } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Public } from "src/util";
import { CreateTaskDTO, GetTaskQuery, TaskDTO } from "./dto";
import { TaskService } from "./task.service";
import { Cron } from "@nestjs/schedule";

@Controller("tasks")
@ApiTags("Task  Endpoints")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /** Create the task */
  @Post()
  @ApiBody({ type: CreateTaskDTO })
  @ApiOkResponse({ type: TaskDTO })
  async create(@Body() dto: CreateTaskDTO): Promise<TaskDTO> {
    const task = await this.taskService.addTask(dto);
    return task;
  }

  /** Get all tasks */
  @Get()
  @Public()
  @ApiOkResponse({ type: [TaskDTO] })
  async getAll(@Query() dto: GetTaskQuery): Promise<TaskDTO[]> {
    const tasks = await this.taskService.getQueue(dto);
    return tasks;
  }

  /** Schedule the method to run every 5 minutes */
  @Cron("*/5 * * * *")
  async processQueue(): Promise<void> {
    const tasks = await this.taskService.processQueue();
  }
}
/** End of Controller */
