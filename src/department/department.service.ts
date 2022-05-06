import { DepartmentEntity } from "./department.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class DepartmentSevice {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>
  ) {}
  async findAll(): Promise<DepartmentEntity[]> {
    return await this.departmentRepository.find();
  }
  getAll(): string {
    return "getAll success!";
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
