import { Module } from '@nestjs/common';
import { UsersRepositoryService } from './users-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { GetUserUseCase } from './use-cases/get-user.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersRepositoryService, CreateUserUseCase, GetUserUseCase],
  exports: [UsersRepositoryService],
})
export class UsersRepositoryModule {}
