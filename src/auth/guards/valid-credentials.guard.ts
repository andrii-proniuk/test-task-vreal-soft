import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { MappedType, PickType } from '@nestjs/mapped-types';
import { validate } from 'class-validator';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class ValidCredentialsGuard implements CanActivate {
  private validationClass: MappedType<Pick<LoginDto, 'username' | 'password'>>;

  constructor(private authService: AuthService) {
    this.validationClass = PickType(LoginDto, [
      'username',
      'password',
    ] as const);
  }

  private async validate(username: any, password: any): Promise<void> {
    const validationObj = new this.validationClass();
    validationObj.username = username;
    validationObj.password = password;

    const errors = await validate(validationObj);

    if (errors?.length) {
      throw new BadRequestException({ errors });
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const { username, password } = req.body;

    await this.validate(username, password);

    const user = await this.authService.validateUser(username, password);

    req.user = user;

    return true;
  }
}
