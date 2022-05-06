import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { EmployeeSevice } from "./employee.service";

@Controller("/api/v2/employee")
export class EmployeeController {
  constructor(private readonly employeeServise: EmployeeSevice) {}
  @Get()
  async getById(): Promise<any> {
    return this.employeeServise.getById();
  }
  @Post()
  async create(): Promise<any> {
    return this.employeeServise.create();
  }
  @Patch()
  async updeteById(): Promise<any> {
    return this.employeeServise.updeteById();
  }
  @Delete()
  async deleteById(): Promise<any> {
    return this.employeeServise.deleteById();
  }
}
