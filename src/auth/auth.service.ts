// import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { LoginUserDto } from "src/user/dto/login.dto";
// import { UserEntity } from "src/user/user.entity";
// import { Repository } from "typeorm";
// import { compare } from "bcrypt";

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectRepository(UserEntity)
//     private readonly userRepository: Repository<UserEntity>
//   ) {}

//   async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
//     const user = await this.userRepository.findOne(
//       {
//         userName: loginUserDto.userName,
//       },
//       { select: ["id", "userName", "password"] }
//     );
//     if (!user) {
//       throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
//     }
//     const isPasswordCorrect = await compare(
//       loginUserDto.password,
//       user.password
//     );
//     if (!isPasswordCorrect) {
//       throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
//     }
//     delete user.password;
//     return user;
//   }
// }
