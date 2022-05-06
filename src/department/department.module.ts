import { DepartmentEntity } from "./department.entity";
import { DepartmentSevice } from "./department.service";
import { DepartmentController } from "./department.controller";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity])],
  controllers: [DepartmentController],
  providers: [DepartmentSevice],
})
export class DepartmentModule {}
