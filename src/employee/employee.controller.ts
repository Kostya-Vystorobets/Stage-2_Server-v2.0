import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { EmployeeSevice } from './employee.service';

@Controller('/api/v2/employee')
export class EmployeeControler {
    constructor(private readonly employeeServise: EmployeeSevice) { }
    @Get()
    getById(): string {
        return this.employeeServise.getById();
    }
    @Post()
    create(): string {
        return this.employeeServise.create();
    }
    @Patch()
    updeteById(): string {
        return this.employeeServise.updeteById();
    }
    @Delete()
    deleteById(): string {
        return this.employeeServise.deleteById();
    }
}
