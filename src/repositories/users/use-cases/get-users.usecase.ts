import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { GetUsersDto } from '../../../users/dto/get-users.dto';

@Injectable()
export class GetUsersUseCase {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async exec(getUsersDto: GetUsersDto): Promise<User[]> {
    const { search, sort, direction } = getUsersDto;
    return this.usersRepository.find({
      where: {
        name: search && ILike(`%${search}%`),
      },
      order: {
        [sort]: direction,
      },
      ...getUsersDto.getPagination(),
    });
  }
}
