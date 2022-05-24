import { EmployeeEntity } from "src/employee/employee.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "departments" })
export class DepartmentEntity {
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

  @OneToMany(
    () => EmployeeEntity,
    (employee: EmployeeEntity) => employee.departmentId
  )
  @JoinColumn({ name: "employees" })
  employees: EmployeeEntity[];
}
