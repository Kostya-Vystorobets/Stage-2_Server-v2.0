import { DepartmentSevice } from './department.service';
import { DepartmentControler } from './department.controller';
import { Module } from '@nestjs/common';

@Module({
    controllers: [DepartmentControler],
    providers: [DepartmentSevice]
})
export class DepartmentModule { }
