import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { DepartmentSevice } from './department.service';

@Controller('/api/v2/department')
export class DepartmentControler {
    constructor(private readonly departmentServise: DepartmentSevice) { }
    @Get()
    getAll(): string {
        return this.departmentServise.getAll();
    }
    getById(): string {
        return this.departmentServise.getById();
    }
    @Post()
    create(): string {
        return this.departmentServise.create();
    }
    @Patch()
    updeteById(): string {
        return this.departmentServise.updeteById();
    }
    @Delete()
    deleteById(): string {
        return this.departmentServise.deleteById();
    }
}
