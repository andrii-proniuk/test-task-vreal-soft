import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepositoryService } from '../../repositories/users/users-repository.service';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import { isNumberString } from 'class-validator';

@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(private usersRepositoryService: UsersRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const { id } = req.params;

    if (!isNumberString(id)) {
      throw new BadRequestException({
        message: 'invalid user id',
      });
    }

    const user = await this.usersRepositoryService.getById(parseInt(id));

    if (!user) {
      throw new NotFoundException({
        message: 'user not found',
      });
    }

    req.locals = { user };

    return true;
  }
}
