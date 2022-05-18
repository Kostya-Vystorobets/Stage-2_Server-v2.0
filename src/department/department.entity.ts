import { EmployeeEntity } from "src/employee/employee.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "departments" })
export class DepartmentEntity {
  getById(
    departmentId: number
  ): DepartmentEntity | PromiseLike<DepartmentEntity> {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => EmployeeEntity, (employee) => employee.department)
  employees: EmployeeEntity[];
}
