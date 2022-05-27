import { DepartmentEntity } from "src/department/department.entity";
import { EmployeeEntity } from "./employee.entity";
import { EmployeeSevice } from "./employee.service";
import { EmployeeController } from "./employee.controller";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DepartmentSevice } from "src/department/department.service";

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity, DepartmentEntity])],
  controllers: [EmployeeController],
  providers: [EmployeeSevice, DepartmentSevice],
})
export class EmployeeModule {}
