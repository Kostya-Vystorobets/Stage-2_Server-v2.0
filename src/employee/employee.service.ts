import { EmployeeEntity } from "./employee.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class EmployeeSevice {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly emploeeRepository: Repository<EmployeeEntity>
  ) {}

  async findAll(): Promise<EmployeeEntity[]> {
    return await this.emploeeRepository.find();
  }
  getById(): string {
    return "getById success!";
  }
  create(): string {
    return "create success!";
  }
  updeteById(): string {
    return "updeteById success!";
  }
  deleteById(): string {
    return "deleteById success!";
  }
}
