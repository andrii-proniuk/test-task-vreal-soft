import { Injectable } from '@nestjs/common';
import { CreatePostUseCase } from './use-cases/create-post.usecase';
import { GetPostByIdUseCase } from './use-cases/get-post-by-id.usecase';
import { GetPostsUseCase } from './use-cases/get-posts.usecase';
import { UpdatePostUseCase } from './use-cases/update-post.usecase';
import { DeletePostUseCase } from './use-cases/delete-post-by-id.usecase';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from '../../posts/dto/create-post.dto';
import { User } from '../entities/user.entity';
import { UpdatePostDto } from '../../posts/dto/update-post.dto';
import { GetPostsDto } from '../../posts/dto/get-posts.dto';

@Injectable()
export class PostsRepositoryService {
  constructor(
    private createPostUseCase: CreatePostUseCase,
    private getPostByIdUseCase: GetPostByIdUseCase,
    private getPostsUseCase: GetPostsUseCase,
    private updatePostUseCase: UpdatePostUseCase,
    private deletePostUseCase: DeletePostUseCase,
  ) {}

  async create(user: User, createPostDto: CreatePostDto): Promise<Post> {
    return this.createPostUseCase.exec(user, createPostDto);
  }

  async getById(id: number): Promise<Post> {
    return this.getPostByIdUseCase.exec(id);
  }

  async get(getPostsDto: GetPostsDto): Promise<Post[]> {
    return this.getPostsUseCase.exec(getPostsDto);
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    return this.updatePostUseCase.exec(id, updatePostDto);
  }

  async delete(id: number): Promise<Post> {
    return this.deletePostUseCase.exec(id);
  }
}
