import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { LoginUserDto } from "./dto/login.dto";
import { UserEntity } from "./user.entity";
import { UserSevice } from "./user.service";

@Controller("/api/v2/user")
export class UserController {
  constructor(private readonly userServise: UserSevice) {}
  @Post("/login")
  @UsePipes(new ValidationPipe())
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.userServise.login(loginUserDto);
  }
  @Post("/")
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userServise.createUser(createUserDto);
  }
}
