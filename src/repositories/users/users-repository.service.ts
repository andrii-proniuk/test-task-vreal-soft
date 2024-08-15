import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { GetUserUseCase } from './use-cases/get-user.usecase';
import { SignUpDto } from '../../auth/dto/sign-up.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepositoryService {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
  ) {}

  async create(signUpDto: SignUpDto): Promise<User> {
    return this.createUserUseCase.exec(signUpDto);
  }

  async getById(id: number): Promise<User> {
    return this.getUserUseCase.exec({ id });
  }

  async getByEmail(email: string): Promise<User> {
    return this.getUserUseCase.exec({ email });
  }
}
