import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import { isNumberString } from 'class-validator';
import { PostsRepositoryService } from '../../repositories/posts/posts-repository.service';

@Injectable()
export class PostExistsGuard implements CanActivate {
  constructor(private postsRepositoryService: PostsRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const { id } = req.params;

    if (!isNumberString(id)) {
      throw new BadRequestException({
        message: 'invalid post id',
      });
    }

    const post = await this.postsRepositoryService.getById(parseInt(id));

    if (!post) {
      throw new NotFoundException({
        message: 'post not found',
      });
    }

    req.locals = { post };

    return true;
  }
}
