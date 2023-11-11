import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsOptional,
} from "class-validator";
import { PaginationDTO } from "src/util";
import { TaskStatus } from "../task.constants";

export class GetTaskQuery extends PaginationDTO {
  @ApiProperty({ required: false, enum: TaskStatus })
  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;
}
