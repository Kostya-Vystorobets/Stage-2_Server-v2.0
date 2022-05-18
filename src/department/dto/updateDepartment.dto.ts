import { IsNotEmpty } from "class-validator";

export class UpdateDepartmentDto {
  @IsNotEmpty()
  readonly description: string;
}
