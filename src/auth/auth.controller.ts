// import {
//   Body,
//   Controller,
//   Post,
//   Session,
//   UsePipes,
//   ValidationPipe,
// } from "@nestjs/common";
// import { LoginUserDto } from "src/user/dto/login.dto";
// import { UserEntity } from "src/user/user.entity";
// import { AuthService } from "./auth.service";

// @Controller("/api/v2/user")
// export class AuthController {
//   constructor(private readonly authServise: AuthService) {}

//   @Post("/login")
//   @UsePipes(new ValidationPipe())
//   async login(
//     @Session() session: any,
//     @Body() loginUserDto: LoginUserDto
//   ): Promise<UserEntity> {
//     const user = await this.authServise.login(loginUserDto);
//     session.isAuth = true;
//     return user;
//   }
// }
// //   @Get("/logout")
// //   async logout(@Session() session: SessionType) {
// //     return new Promise<void>((resolve, reject) => {
// //       session.destroy((error: Error) => {
// //         if (error) {
// //           reject(error);
// //         } else {
// //           resolve();
// //         }
// //       });
// //     });
// //   }
// // }
