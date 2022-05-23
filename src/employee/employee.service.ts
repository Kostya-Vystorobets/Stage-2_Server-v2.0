import { UpdateEmployeeDto } from "./dto/updateEmployee.dto";
import { CreateEmployeeDto } from "./dto/createEmployee.dto";
import { EmployeeEntity } from "./employee.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class EmployeeSevice {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>
  ) {}
  async getById(id: number): Promise<EmployeeEntity> {
    return await this.employeeRepository.findOne({ id });
  }

  async createEmployee(
    departmentId: number,
    createEmployeeDto: CreateEmployeeDto
  ): Promise<EmployeeEntity> {
    const corentDepartment: DepartmentEntity =
      this.departmentServise.getById(departmentId);
    const newEmployee = new EmployeeEntity();
    Object.assign(newEmployee, createEmployeeDto);
    newEmployee.department = corentDepartment;
    return await this.employeeRepository.save(newEmployee);
  }

  async updeteById(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto
  ): Promise<EmployeeEntity> {
    const employee = await this.getById(id);
    if (!employee) {
      throw new HttpException("Employee does not exist", HttpStatus.NOT_FOUND);
    }
    Object.assign(employee, updateEmployeeDto);
    return await this.employeeRepository.save(employee);
  }
  async deleteById(id: number): Promise<DeleteResult> {
    const employee = await this.getById(id);
    if (!employee) {
      throw new HttpException("Employee does not exist", HttpStatus.NOT_FOUND);
    }
    return await this.employeeRepository.delete({ id });
  }
}
