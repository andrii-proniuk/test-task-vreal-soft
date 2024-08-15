import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import { UserRolesEnum } from '../../repositories/entities/user.entity';

@Injectable()
export class CanChangePostGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    return (
      req.user.role === UserRolesEnum.admin ||
      req.locals.post?.userId === req.user.id
    );
  }
}
