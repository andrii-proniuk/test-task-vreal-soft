import { Injectable } from '@nestjs/common';
import { Post } from '../../entities/post.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { UpdatePostDto } from '../../../posts/dto/update-post.dto';

@Injectable()
export class UpdatePostUseCase {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async exec(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    return this.entityManager.transaction(async (transaction) => {
      await transaction.update(Post, { id }, updatePostDto);

      return transaction.findOne(Post, {
        where: { id },
        relations: { user: true },
      });
    });
  }
}
