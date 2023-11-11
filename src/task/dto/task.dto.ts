import { ApiProperty } from "@nestjs/swagger";

export class TaskDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  parameter: string;
  @ApiProperty()
  status: string;
}
