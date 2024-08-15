import { Injectable } from '@nestjs/common';
import { Post } from '../../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePostDto } from '../../../posts/dto/update-post.dto';

@Injectable()
export class UpdatePostUseCase {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async exec(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    await this.postsRepository.update({ id }, updatePostDto);

    return this.postsRepository.findOneBy({ id });
  }
}
