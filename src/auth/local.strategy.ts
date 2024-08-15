import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersRepositoryService } from '../repositories/users/users-repository.service';
// import { User } from '../repositories/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersRepositoryService: UsersRepositoryService) {
    super();
  }

  // async validate(): Promise<User> {

  // }
}
