import { UpdateEmployeeDto } from "./dto/updateEmployee.dto";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "src/user/guards/auth.guard";
import { EmployeeSevice } from "./employee.service";
import { EmployeeEntity } from "./employee.entity";

@Controller("/api/v2/employees")
export class EmployeeController {
  constructor(private readonly employeeServise: EmployeeSevice) {}
  @Get(":id")
  @UseGuards(AuthGuard)
  async getById(@Param("id") id: number): Promise<EmployeeEntity> {
    return this.employeeServise.getById(id);
  }
  @Patch(":id")
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
