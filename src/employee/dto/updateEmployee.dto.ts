import { IsNotEmpty } from "class-validator";

export class UpdateEmployeeDto {
  @IsNotEmpty()
  readonly email: string;
}
