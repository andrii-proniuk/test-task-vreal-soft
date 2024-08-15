import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRolesEnum } from '../../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedAdminUseCase {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async exec(): Promise<void> {
    const admin = await this.userRepository.findOneBy({ username: 'admin' });

    if (admin) {
      return;
    }

    const hashedPassword = await User.hashPassword('admin');

    const user = this.userRepository.create({
      username: 'admin',
      password: hashedPassword,
      role: UserRolesEnum.admin,
    });

    await this.userRepository.save(user);
  }
}
