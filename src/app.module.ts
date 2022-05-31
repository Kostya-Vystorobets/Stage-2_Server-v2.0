import { EmployeeModule } from "./employee/employee.module";
import { DepartmentModule } from "./department/department.module";
import { UserModule } from "./user/user.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import ormconfig from "./ormconfig";
import { ConfigModule } from "@nestjs/config";
import configuration from "./configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    DepartmentModule,
    EmployeeModule,
  ],
})
export class AppModule {}
