import { Injectable } from '@nestjs/common';
import { Post } from '../../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { GetPostsDto } from '../../../posts/dto/get-posts.dto';

@Injectable()
export class GetPostsUseCase {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async exec(getPostsDto: GetPostsDto): Promise<Post[]> {
    const { search, sort, direction } = getPostsDto;

    return this.postsRepository.find({
      where: {
        title: search && ILike(`%${search}%`),
      },
      order: {
        [sort]: direction,
      },
      relations: {
        user: true,
      },
      ...getPostsDto.getPagination(),
    });
  }
}
