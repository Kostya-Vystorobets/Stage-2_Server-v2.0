import { IsNotEmpty } from "class-validator";

export class CreateDepartmentDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  readonly employees?: string[];
}
