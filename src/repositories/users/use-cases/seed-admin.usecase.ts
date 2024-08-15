import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User, UserRolesEnum } from '../../entities/user.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class SeedAdminUseCase {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async exec(): Promise<void> {
    await this.entityManager.transaction(async (transaction) => {
      const admin = await transaction.findOneBy(User, { username: 'admin' });

      if (admin) {
        return;
      }

      const hashedPassword = await User.hashPassword('admin');

      const user = transaction.create(User, {
        name: 'Admin',
        username: 'admin',
        password: hashedPassword,
        role: UserRolesEnum.admin,
      });

      await transaction.save(user);
    });
  }
}
