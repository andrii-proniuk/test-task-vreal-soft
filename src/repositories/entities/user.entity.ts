import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

export enum UserRolesEnum {
  user = 'user',
  admin = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: UserRolesEnum.user })
  role: UserRolesEnum;

  @CreateDateColumn({
    update: false,
  })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 8);
  }

  comparePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password);
  }
}
