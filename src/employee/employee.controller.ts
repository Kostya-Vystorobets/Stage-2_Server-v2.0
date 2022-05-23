import { UpdateEmployeeDto } from "./dto/updateEmployee.dto";
import { DepartmentSevice } from "src/department/department.service";
import { CreateEmployeeDto } from "./dto/createEmployee.dto";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "src/user/guards/auth.guard";
import { EmployeeSevice } from "./employee.service";
import { EmployeeEntity } from "./employee.entity";
import { DepartmentEntity } from "src/department/department.entity";

@Controller("/api/v2/employee")
export class EmployeeController {
  constructor(private readonly employeeServise: EmployeeSevice) {}
  @Get(":id")
  @UseGuards(AuthGuard)
  async getById(@Param("id") id: number): Promise<EmployeeEntity> {
    return this.employeeServise.getById(id);
  }
  @Post("department/:departmentId")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @Param("departmentId") departmentId: number,
    @Body() createEmployeeDto: CreateEmployeeDto
  ): Promise<EmployeeEntity> {
    return this.employeeServise.createEmployee(departmentId, createEmployeeDto);
  }
  @Patch()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updeteById(
    @Param("id") id: number,
    @Body() updateEmployeetDto: UpdateEmployeeDto
  ): Promise<EmployeeEntity> {
    return this.employeeServise.updeteById(id, updateEmployeetDto);
  }
  @Delete(":id")
  @UseGuards(AuthGuard)
  async deleteById(@Param("id") id: number) {
    return this.employeeServise.deleteById(id);
  }
}
