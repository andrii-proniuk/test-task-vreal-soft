import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostResponseDto } from './response-dto/post.response-dto';
import { CreatePostDto } from './dto/create-post.dto';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../repositories/entities/user.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PostExistsGuard } from './guards/post-exists.guard';
import { CanModifyPostGuard } from './guards/can-modify-post.guard';
import { GetPostsDto } from './dto/get-posts.dto';

@Controller('posts')
@ApiTags('posts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  async create(
    @GetUser() user: User,
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostResponseDto> {
    return this.postsService.create(user, createPostDto);
  }

  @Get()
  async get(@Query() getPostsDto: GetPostsDto): Promise<PostResponseDto[]> {
    return this.postsService.get(getPostsDto);
  }

  @Get(':id')
  @UseGuards(PostExistsGuard)
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PostResponseDto> {
    return this.postsService.getById(id);
  }

  @Patch(':id')
  @UseGuards(PostExistsGuard, CanModifyPostGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostResponseDto> {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(PostExistsGuard, CanModifyPostGuard)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PostResponseDto> {
    return this.postsService.delete(id);
  }
}
