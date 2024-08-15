import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { GetUserUseCase } from './use-cases/get-user.usecase';
import { SignUpDto } from '../../auth/dto/sign-up.dto';
import { User } from '../entities/user.entity';
import { SeedAdminUseCase } from './use-cases/seed-admin.usecase';
import { GetUsersUseCase } from './use-cases/get-users.usecase';
import { UpdateUserUseCase } from './use-cases/update-user.usecase';
import { DeleteUserUseCase } from './use-cases/delete-user.usecase';
import { GetUsersDto } from '../../users/dto/get-users.dto';
import { UpdateUserDto } from '../../users/dto/update-user.dto';

@Injectable()
export class UsersRepositoryService {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
    private seedAdminUseCase: SeedAdminUseCase,
    private getUsersUseCase: GetUsersUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
  ) {}

  async create(signUpDto: SignUpDto): Promise<User> {
    return this.createUserUseCase.exec(signUpDto);
  }

  async getById(id: number): Promise<User> {
    return this.getUserUseCase.exec({ id });
  }

  async getByUsername(username: string): Promise<User> {
    return this.getUserUseCase.exec({ username });
  }

  async get(getUsersDto: GetUsersDto): Promise<User[]> {
    return this.getUsersUseCase.exec(getUsersDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.updateUserUseCase.exec(id, updateUserDto);
  }

  async delete(id: number): Promise<User> {
    return this.deleteUserUseCase.exec(id);
  }

  async seedAdmin(): Promise<void> {
    return this.seedAdminUseCase.exec();
  }
}
