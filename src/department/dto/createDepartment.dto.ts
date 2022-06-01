import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateDepartmentDto {
  @IsNotEmpty()
  @ApiProperty({ example: "General Management" })
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty({ example: "Responsible for the management of the company" })
  readonly description: string;

  readonly employees?: string[];
}
