import { Injectable } from '@nestjs/common';
import { Post } from '../../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GetPostByIdUseCase {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async exec(id: number): Promise<Post> {
    return this.postsRepository.findOne({ where: { id } });
  }
}
