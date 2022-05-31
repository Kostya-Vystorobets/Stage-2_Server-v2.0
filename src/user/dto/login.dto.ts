import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Admin" })
  readonly userName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "0c7045ec9abc578394af1898" })
  readonly password: string;
}
