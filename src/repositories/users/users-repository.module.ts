import { Module } from '@nestjs/common';
import { UsersRepositoryService } from './users-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { GetUserUseCase } from './use-cases/get-user.usecase';
import { SeedAdminUseCase } from './use-cases/seed-admin.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersRepositoryService,
    CreateUserUseCase,
    GetUserUseCase,
    SeedAdminUseCase,
  ],
  exports: [UsersRepositoryService],
})
export class UsersRepositoryModule {}
