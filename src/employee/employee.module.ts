import { EmployeeSevice } from './employee.service';
import { EmployeeControler } from './employee.controller';
import { Module } from '@nestjs/common';

@Module({
    controllers: [EmployeeControler],
    providers: [EmployeeSevice]
})
export class EmployeeModule { }
