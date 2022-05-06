import { UserEntity } from "./user.entity";
import { UserSevice } from "./user.service";
import { UserController } from "./user.controller";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserSevice],
})
export class UserModule {}
