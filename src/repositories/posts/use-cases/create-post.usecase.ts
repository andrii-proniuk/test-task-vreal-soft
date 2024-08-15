import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../../../posts/dto/create-post.dto';
import { User } from '../../entities/user.entity';

@Injectable()
export class CreatePostUseCase {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async exec(user: User, { title, text }: CreatePostDto): Promise<Post> {
    const post = this.postsRepository.create({
      user,
      title,
      text,
    });

    return this.postsRepository.save(post);
  }
}
