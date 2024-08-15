import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { EntityManager } from 'typeorm';
import { UpdateUserDto } from '../../../users/dto/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async exec(
    id: number,
    { name, username, password }: UpdateUserDto,
  ): Promise<User> {
    return this.entityManager.transaction(async (transaction) => {
      await transaction.update(
        User,
        { id },
        {
          name,
          username,
          password: password && (await User.hashPassword(password)),
        },
      );

      return transaction.findOneBy(User, { id });
    });
  }
}
