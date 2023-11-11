
import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskSanitizer } from './task.sanitizer';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskSanitizer],
})
export class TaskModule {}