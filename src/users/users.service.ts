import { Injectable } from '@nestjs/common';
import { UsersRepositoryService } from '../repositories/users/users-repository.service';
import { GetUsersDto } from './dto/get-users.dto';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './response-dto/user.response-dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepositoryService: UsersRepositoryService) {}

  async get(getUsersDto: GetUsersDto): Promise<UserResponseDto[]> {
    const users = await this.usersRepositoryService.get(getUsersDto);

    return plainToInstance(UserResponseDto, users);
  }

  async getById(id: number): Promise<UserResponseDto> {
    const user = await this.usersRepositoryService.getById(id);

    return plainToInstance(UserResponseDto, user);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersRepositoryService.update(id, updateUserDto);

    return plainToInstance(UserResponseDto, user);
  }

  async delete(id: number): Promise<UserResponseDto> {
    const user = await this.usersRepositoryService.delete(id);

    return plainToInstance(UserResponseDto, user);
  }
}
