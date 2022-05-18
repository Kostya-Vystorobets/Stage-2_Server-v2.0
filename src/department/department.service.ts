import { CreateDepartmentDto } from "./dto/createDepartment.dto";
import { DepartmentEntity } from "./department.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { UpdateDepartmentDto } from "./dto/updateDepartment.dto";

@Injectable()
export class DepartmentSevice {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>
  ) {}
  async getAll(): Promise<DepartmentEntity[]> {
    return await this.departmentRepository.find();
  }
  async getById(id: number): Promise<DepartmentEntity> {
    return await this.departmentRepository.findOne({ id });
  }
  async createDepartment(
    createDepartmentDto: CreateDepartmentDto
  ): Promise<DepartmentEntity> {
    const newDepartment: DepartmentEntity = new DepartmentEntity();
    Object.assign(newDepartment, createDepartmentDto);
    newDepartment.employees = [];
    return await this.departmentRepository.save(newDepartment);
  }
  async updeteById(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto
  ): Promise<DepartmentEntity> {
    const department: DepartmentEntity = await this.getById(id);
    if (!department) {
      throw new HttpException(
        "Department does not exist",
        HttpStatus.NOT_FOUND
      );
    }
    Object.assign(department, updateDepartmentDto);
    return await this.departmentRepository.save(department);
  }
  async deleteById(id: number): Promise<DeleteResult> {
    const department: DepartmentEntity = await this.getById(id);
    if (!department) {
      throw new HttpException(
        "Department does not exist",
        HttpStatus.NOT_FOUND
      );
    }
    return await this.departmentRepository.delete({ id });
  }
}
