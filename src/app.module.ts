import { EmployeeModule } from "./employee/employee.module";
import { DepartmentModule } from "./department/department.module";
import { UserModule } from "./user/user.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import ormconfig from "./ormconfig";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    DepartmentModule,
    EmployeeModule,
  ],
})
export class AppModule {}
