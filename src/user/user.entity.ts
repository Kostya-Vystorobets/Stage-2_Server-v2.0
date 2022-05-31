import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { hash } from "bcrypt";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "users" })
export class UserEntity {
  @ApiProperty({
    example: "36412",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Admin",
  })
  @Column()
  userName: string;

  @ApiProperty({
    example: "0c7045ec9abc578394af1898",
  })
  @Column({ select: false })
  password: string;

  @ApiProperty()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @BeforeInsert()
  async hasPassworld() {
    this.password = await hash(this.password, 10);
  }
}
