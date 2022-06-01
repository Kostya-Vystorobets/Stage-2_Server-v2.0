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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

@ApiTags("Department")
@Controller("/api/v2/departments")
export class DepartmentController {
  constructor(private readonly departmentServise: DepartmentSevice) {}
  @Get()
  @ApiOperation({ summary: "Get all department" })
  @ApiCookieAuth()
  @ApiOkResponse({ type: DepartmentEntity })
  @ApiUnauthorizedResponse({ description: "Not authorized" })
  @ApiNotFoundResponse({
    description: "The department with this ID was not found.",
  })
  @UseGuards(AuthGuard)
  async getAll(
    @Query() query: DepartmentsOptionInterface
  ): Promise<DepartmentsResponseInterface> {
    return this.departmentServise.getAll(query);
  }
  @Get(":id")
  @ApiOperation({ summary: "Get department by id" })
  @ApiCookieAuth()
  @ApiUnauthorizedResponse({ description: "Not authorized" })
  @ApiOkResponse({ type: DepartmentEntity })
  @ApiNotFoundResponse({
    description: "The department with this ID was not found.",
  })
  @UseGuards(AuthGuard)
  async getById(@Param("id") id: number): Promise<DepartmentEntity> {
    return this.departmentServise.getById(id);
  }
  @Post()
  @ApiOperation({ summary: "Create department" })
  @ApiCookieAuth()
  @ApiOkResponse({ type: DepartmentEntity })
  @ApiUnauthorizedResponse({ description: "Not authorized" })
  @ApiBadRequestResponse({
    description: "The department with this Name already exists.",
  })
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto
  ): Promise<DepartmentEntity> {
    return this.departmentServise.createDepartment(createDepartmentDto);
  }
  @Post(":id/employees")
  @ApiOperation({ summary: "Create employee in department by id" })
  @ApiCookieAuth()
  @ApiBody({ type: CreateEmployeeDto })
  @ApiOkResponse({ type: EmployeeEntity })
  @ApiUnauthorizedResponse({ description: "Not authorized" })
  @ApiBadRequestResponse({
    description: "The department with this ID was not found.",
  })
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createEmployeeInDepartment(
    @Param("id") id: number,
    @Body() createEmployeeDto: CreateEmployeeDto
  ): Promise<EmployeeEntity> {
    return this.departmentServise.createEmployeeInDepartment(
      id,
      createEmployeeDto
    );
  }
  @Patch(":id")
  @ApiOperation({ summary: "Change department by id" })
  @ApiCookieAuth()
  @ApiOkResponse({ type: DepartmentEntity })
  @ApiUnauthorizedResponse({ description: "Not authorized" })
  @ApiNotFoundResponse({
    description: "The department with this ID was not found.",
  })
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updeteById(
    @Param("id") id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto
  ): Promise<DepartmentEntity> {
    return this.departmentServise.updeteById(id, updateDepartmentDto);
  }
  @Delete(":id")
  @ApiOperation({ summary: "Delete department by id" })
  @ApiCookieAuth()
  @ApiOkResponse({ description: "OK" })
  @ApiUnauthorizedResponse({ description: "Not authorized" })
  @ApiNotFoundResponse({
    description:
      "Unable to delete a department. The department contains employees.",
  })
  @ApiNotFoundResponse({
    description: "The department with this ID was not found.",
  })
  @UseGuards(AuthGuard)
  async deleteById(@Param("id") id: number): Promise<DeleteResult> {
    return this.departmentServise.deleteById(id);
  }
}
