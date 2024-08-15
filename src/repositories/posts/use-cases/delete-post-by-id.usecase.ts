import { Injectable } from '@nestjs/common';
import { Post } from '../../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DeletePostUseCase {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async exec(id: number): Promise<Post> {
    const post = await this.postsRepository.findOneBy({ id });

    await this.postsRepository.delete({ id });

    return post;
  }
}
