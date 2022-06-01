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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

@ApiTags("Employee")
@Controller("/api/v2/employees")
export class EmployeeController {
  constructor(private readonly employeeServise: EmployeeSevice) {}
  @Get(":id")
  @ApiOperation({ summary: "Get employee by id" })
  @ApiCookieAuth()
  @ApiUnauthorizedResponse({ description: "Not authorized" })
  @ApiBadRequestResponse()
  @ApiOkResponse({ type: EmployeeEntity })
  @UseGuards(AuthGuard)
  async getById(@Param("id") id: number): Promise<EmployeeEntity> {
    return this.employeeServise.getById(id);
  }
  @Patch(":id")
  @ApiOperation({ summary: "Change employee by id" })
  @ApiCookieAuth()
  @ApiUnauthorizedResponse({ description: "Not authorized" })
  @ApiBadRequestResponse()
  @ApiBody({ type: UpdateEmployeeDto })
  @ApiOkResponse({ type: EmployeeEntity })
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updeteById(
    @Param("id") id: number,
    @Body() updateEmployeetDto: UpdateEmployeeDto
  ): Promise<EmployeeEntity> {
    return this.employeeServise.updeteById(id, updateEmployeetDto);
  }
  @Delete(":id")
  @ApiOperation({ summary: "Delete employee by id" })
  @ApiCookieAuth()
  @ApiUnauthorizedResponse({ description: "Not authorized" })
  @ApiBadRequestResponse()
  @UseGuards(AuthGuard)
  async deleteById(@Param("id") id: number) {
    return this.employeeServise.deleteById(id);
  }
}
