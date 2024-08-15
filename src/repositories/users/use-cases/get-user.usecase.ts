import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class GetUserUseCase {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async exec(findOptions: FindOptionsWhere<User>): Promise<User> {
    return this.userRepository.findOne({ where: findOptions });
  }
}
