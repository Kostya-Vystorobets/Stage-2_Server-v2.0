import {
  Body,
  Controller,
  Post,
  UsePipes,
  Session,
  ValidationPipe,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { LoginUserDto } from "./dto/login.dto";
import { UserEntity } from "./user.entity";
import { UserSevice } from "./user.service";
import { Session as SessionData } from "express-session";
import { AuthGuard } from "./guards/auth.guard";

@Controller("/api/v2/user")
export class UserController {
  constructor(private readonly userServise: UserSevice) {}
  @Post("/login")
  @UsePipes(new ValidationPipe())
  async login(
    @Session() session: SessionData,
    @Body() loginUserDto: LoginUserDto
  ): Promise<UserEntity> {
    const user = this.userServise.login(loginUserDto);
    session.isAuth = true;
    return user;
  }

  @Get("logout")
  @UseGuards(AuthGuard)
  async logout(@Session() session: SessionData): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      session.destroy((error: Error) => {
        if (error) reject(error);
        resolve();
      });
    });
  }

  @Post("/")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userServise.createUser(createUserDto);
  }
}
