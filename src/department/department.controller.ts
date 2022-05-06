import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { DepartmentSevice } from "./department.service";

@Controller("/api/v2/department")
export class DepartmentController {
  constructor(private readonly departmentServise: DepartmentSevice) {}
  @Get()
  async getAll(): Promise<any> {
    return this.departmentServise.getAll();
  }
  async getById(): Promise<any> {
    return this.departmentServise.getById();
  }
  @Post()
  async create(): Promise<any> {
    return this.departmentServise.create();
  }
  @Patch()
  async updeteById(): Promise<any> {
    return this.departmentServise.updeteById();
  }
  @Delete()
  async deleteById(): Promise<any> {
    return this.departmentServise.deleteById();
  }
}
