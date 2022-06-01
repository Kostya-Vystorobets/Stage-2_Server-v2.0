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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

@ApiTags("User")
@Controller("/api/v2/users")
export class UserController {
  constructor(private readonly userServise: UserSevice) {}
  @Post("/login")
  @ApiOperation({ summary: "Logs user into the system" })
  @ApiResponse({
    status: 201,
    description: "User Login",
    type: UserEntity,
  })
  @ApiBadRequestResponse({ description: "User not found" })
  @ApiBody({ type: LoginUserDto })
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
  @ApiOperation({ summary: "Logging out of the system" })
  @ApiCookieAuth()
  @ApiOkResponse({ description: "OK" })
  @ApiUnauthorizedResponse({ description: "Not authorized" })
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
  @ApiOperation({ summary: "Create user" })
  @ApiCookieAuth()
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 201,
    description: "User Login",
    type: UserEntity,
  })
  @ApiUnauthorizedResponse({ description: "Not authorized" })
  @ApiBadRequestResponse()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userServise.createUser(createUserDto);
  }
}
