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
import { DeleteResult } from "typeorm";
import { DepartmentEntity } from "./department.entity";
import { DepartmentSevice } from "./department.service";
import { CreateDepartmentDto } from "./dto/createDepartment.dto";
import { UpdateDepartmentDto } from "./dto/updateDepartment.dto";

@Controller("/api/v2/departments")
export class DepartmentController {
  constructor(private readonly departmentServise: DepartmentSevice) {}
  @Get()
  @UseGuards(AuthGuard)
  async getAll(): Promise<DepartmentEntity[]> {
    return this.departmentServise.getAll();
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
