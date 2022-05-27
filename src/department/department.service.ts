import { CreateDepartmentDto } from "./dto/createDepartment.dto";
import { DepartmentEntity } from "./department.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, getRepository, Repository } from "typeorm";
import { UpdateDepartmentDto } from "./dto/updateDepartment.dto";
import { DepartmentsResponseInterface } from "./types/departmentsResponse.interface";
import { DepartmentsOptionInterface } from "./types/departmentsOptions.interface";

@Injectable()
export class DepartmentSevice {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>
  ) {}
  async getAll(
    query: DepartmentsOptionInterface
  ): Promise<DepartmentsResponseInterface> {
    const queryBuilder =
      getRepository(DepartmentEntity).createQueryBuilder("department");
    const departmentsCount = await queryBuilder.getCount();
    queryBuilder.orderBy("department.name", "ASC");
    if (query.name) {
      queryBuilder.andWhere("department.name = :name", { name: query.name });
    }
    if (query.limit) {
      queryBuilder.limit(query.limit);
    }
    if (query.offset) {
      queryBuilder.offset(query.offset);
    }
    const departments = await queryBuilder.getMany();
    return { count: departmentsCount, data: departments };
  }
  async getById(id: number): Promise<DepartmentEntity> {
    const department = await this.departmentRepository.findOne({ id });
    if (!department) {
      throw new HttpException(
        "The department with this ID was not found.",
        HttpStatus.NOT_FOUND
      );
    }
    return department;
  }
  async createDepartment(
    createDepartmentDto: CreateDepartmentDto
  ): Promise<DepartmentEntity> {
    const newDepartment = new DepartmentEntity();
    Object.assign(newDepartment, createDepartmentDto);
    newDepartment.employees = [];
    const сheckName = await this.departmentRepository.findOne({
      name: newDepartment.name,
    });
    if (сheckName) {
      throw new HttpException(
        "The department with this Name already exists.",
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.departmentRepository.save(newDepartment);
  }
  async updeteById(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto
  ): Promise<DepartmentEntity> {
    const department = await this.getById(id);
    Object.assign(department, updateDepartmentDto);
    return await this.departmentRepository.save(department);
  }
  async deleteById(id: number): Promise<DeleteResult> {
    const department = await this.getById(id);
    console.log(department);
    if (department.employees.length !== 0) {
      throw new HttpException(
        "Unable to delete a department. The department contains employees.",
        HttpStatus.NOT_FOUND
      );
    }
    return await this.departmentRepository.delete({ id });
  }
}
