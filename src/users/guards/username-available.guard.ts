import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { UsersRepositoryService } from '../../repositories/users/users-repository.service';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';

@Injectable()
export class UsernameAvailableGuard implements CanActivate {
  constructor(private usersRepositoryService: UsersRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const { username } = req.body;

    if (!username || username === req.locals.user.username) {
      return true;
    }

    const user = await this.usersRepositoryService.getByUsername(username);

    if (user) {
      throw new BadRequestException({
        message: 'username is not available',
      });
    }

    return true;
  }
}
