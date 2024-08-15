import { Injectable } from '@nestjs/common';
import { Post } from '../../entities/post.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class DeletePostUseCase {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async exec(id: number): Promise<Post> {
    return this.entityManager.transaction(async (transaction) => {
      const post = await transaction.findOne(Post, {
        where: { id },
        relations: { user: true },
      });

      await transaction.delete(Post, { id });

      return post;
    });
  }
}
