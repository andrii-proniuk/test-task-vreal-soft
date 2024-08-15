import { Module } from '@nestjs/common';
import { PostsRepositoryService } from './posts-repository.service';
import { CreatePostUseCase } from './use-cases/create-post.usecase';
import { GetPostsUseCase } from './use-cases/get-posts.usecase';
import { GetPostByIdUseCase } from './use-cases/get-post-by-id.usecase';
import { UpdatePostUseCase } from './use-cases/update-post.usecase';
import { DeletePostUseCase } from './use-cases/delete-post-by-id.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [
    PostsRepositoryService,
    CreatePostUseCase,
    GetPostsUseCase,
    GetPostByIdUseCase,
    UpdatePostUseCase,
    DeletePostUseCase,
  ],
  exports: [PostsRepositoryService],
})
export class PostsRepositoryModule {}
