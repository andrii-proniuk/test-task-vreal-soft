import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { GetUserUseCase } from './use-cases/get-user.usecase';
import { SignUpDto } from '../../auth/dto/sign-up.dto';
import { User } from '../entities/user.entity';
import { SeedAdminUseCase } from './use-cases/seed-admin.usecase';

@Injectable()
export class UsersRepositoryService {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
    private seedAdminUseCase: SeedAdminUseCase,
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

  async seedAdmin(): Promise<void> {
    return this.seedAdminUseCase.exec();
  }
}
