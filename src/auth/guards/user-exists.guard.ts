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
  private validationClass: MappedType<Pick<LoginDto, 'email' | 'password'>>;

  constructor(private authService: AuthService) {
    this.validationClass = PickType(LoginDto, ['email', 'password'] as const);
  }

  private async validate(email: any, password: any): Promise<void> {
    const validationObj = new this.validationClass();
    validationObj.email = email;
    validationObj.password = password;

    const errors = await validate(validationObj);

    if (errors?.length) {
      throw new BadRequestException({ errors });
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const { email, password } = req.body;

    await this.validate(email, password);

    const user = await this.authService.validateUser(email, password);

    req.user = user;

    return true;
  }
}
