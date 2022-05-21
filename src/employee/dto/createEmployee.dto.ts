import { IsNotEmpty } from "class-validator";

export class CreateEmployeeDto {
  @IsNotEmpty()
  readonly userName: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  department: number;
}
