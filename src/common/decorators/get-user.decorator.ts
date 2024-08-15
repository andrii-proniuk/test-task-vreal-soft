import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { InnerRequest } from '../interfaces/inner-request.interface';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<InnerRequest>();

    return !data ? req.user : req.user[data];
  },
);
