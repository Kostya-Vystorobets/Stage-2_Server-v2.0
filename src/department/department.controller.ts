import { EmployeeSevice } from "./../employee/employee.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateEmployeeDto } from "src/employee/dto/createEmployee.dto";
import { AuthGuard } from "src/user/guards/auth.guard";
import { DeleteResult } from "typeorm";
import { DepartmentEntity } from "./department.entity";
import { DepartmentSevice } from "./department.service";
import { CreateDepartmentDto } from "./dto/createDepartment.dto";
import { UpdateDepartmentDto } from "./dto/updateDepartment.dto";
import { DepartmentsOptionInterface } from "./types/departmentsOptions.interface";
import { DepartmentsResponseInterface } from "./types/departmentsResponse.interface";
import { EmployeeEntity } from "src/employee/employee.entity";

@Controller("/api/v2/departments")
export class DepartmentController {
  constructor(
    private readonly departmentServise: DepartmentSevice,
    private readonly employeeSevice: EmployeeSevice
  ) {}
  @Get()
  @UseGuards(AuthGuard)
  async getAll(
    @Query() query: DepartmentsOptionInterface
  ): Promise<DepartmentsResponseInterface> {
    return this.departmentServise.getAll(query);
  }
  @Get(":id")
  @UseGuards(AuthGuard)
  async getById(@Param("id") id: number): Promise<DepartmentEntity> {
    return this.departmentServise.getById(id);
  }
  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto
  ): Promise<DepartmentEntity> {
    return this.departmentServise.createDepartment(createDepartmentDto);
  }
  @Post(":id/employees")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createUserInDepartment(
    @Param("id") id: number,
    @Body() createEmployeeDto: CreateEmployeeDto
  ): Promise<EmployeeEntity> {
    const currentDepartment = await this.departmentServise.getById(id);
    return this.employeeSevice.createEmployee(
      currentDepartment,
      createEmployeeDto
    );
  }
  @Patch(":id")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updeteById(
    @Param("id") id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto
  ): Promise<DepartmentEntity> {
    return this.departmentServise.updeteById(id, updateDepartmentDto);
  }
  @Delete(":id")
  @UseGuards(AuthGuard)
  async deleteById(@Param("id") id: number): Promise<DeleteResult> {
    return this.departmentServise.deleteById(id);
  }
}
