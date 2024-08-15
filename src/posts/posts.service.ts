import { Injectable } from '@nestjs/common';
import { PostsRepositoryService } from '../repositories/posts/posts-repository.service';
import { PostResponseDto } from './response-dto/post.response-dto';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../repositories/entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetPostsDto } from './dto/get-posts.dto';

@Injectable()
export class PostsService {
  constructor(private postsRepositoryService: PostsRepositoryService) {}

  async create(
    user: User,
    createPostDto: CreatePostDto,
  ): Promise<PostResponseDto> {
    const post = await this.postsRepositoryService.create(user, createPostDto);

    return plainToInstance(PostResponseDto, post);
  }

  async getById(id: number): Promise<PostResponseDto> {
    const post = await this.postsRepositoryService.getById(id);

    return plainToInstance(PostResponseDto, post);
  }

  async get(getPostsDto: GetPostsDto): Promise<PostResponseDto[]> {
    const posts = await this.postsRepositoryService.get(getPostsDto);

    return plainToInstance(PostResponseDto, posts);
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<PostResponseDto> {
    const post = await this.postsRepositoryService.update(id, updatePostDto);

    return plainToInstance(PostResponseDto, post);
  }

  async delete(id: number): Promise<PostResponseDto> {
    const post = await this.postsRepositoryService.delete(id);

    return plainToInstance(PostResponseDto, post);
  }
}
