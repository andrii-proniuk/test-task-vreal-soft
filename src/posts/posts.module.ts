import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepositoryModule } from '../repositories/posts/posts-repository.module';
import { UsersRepositoryModule } from '../repositories/users/users-repository.module';

@Module({
  imports: [UsersRepositoryModule, PostsRepositoryModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
