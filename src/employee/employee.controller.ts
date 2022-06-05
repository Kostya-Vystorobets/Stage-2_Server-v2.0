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
  ApiNotFoundResponse,
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
  @ApiOkResponse({ type: EmployeeEntity })
  @ApiUnauthorizedResponse({ description: "Not authorized" })
  @ApiNotFoundResponse({
    description: "The Employee with this ID was not found.",
  })
  @UseGuards(AuthGuard)
  async getById(@Param("id") id: number): Promise<EmployeeEntity> {
    return this.employeeServise.getById(id);
  }
  @Patch(":id")
  @ApiOperation({ summary: "Change employee by id" })
  @ApiCookieAuth()
  @ApiBody({ type: UpdateEmployeeDto })
  @ApiOkResponse({ type: EmployeeEntity })
  // @ApiEmployeeResponse(CreateEmployeeDto)
  @ApiUnauthorizedResponse({ description: "Not authorized" })
  @ApiBadRequestResponse({
    description: "The employee with this Email already exists.",
  })
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
  @ApiOkResponse({ description: "OK" })
  @ApiUnauthorizedResponse({ description: "Not authorized" })
  @ApiNotFoundResponse({
    description: "The Employee with this ID was not found.",
  })
  @UseGuards(AuthGuard)
  async deleteById(@Param("id") id: number) {
    return this.employeeServise.deleteById(id);
  }
}
