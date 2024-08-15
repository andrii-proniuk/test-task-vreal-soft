import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from '../../../auth/dto/sign-up.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async exec({ username, password }: SignUpDto): Promise<User> {
    const hashedPassword = await User.hashPassword(password);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }
}
