import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { EntityManager } from 'typeorm';
import { Post } from '../../entities/post.entity';

@Injectable()
export class DeleteUserUseCase {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async exec(id: number): Promise<User> {
    return this.entityManager.transaction(async (transaction) => {
      const user = await transaction.findOneBy(User, { id });

      await this.entityManager.delete(Post, { userId: id });
      await this.entityManager.delete(User, { id });

      return user;
    });
  }
}
