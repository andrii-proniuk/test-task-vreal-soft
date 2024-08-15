import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { UsersRepositoryService } from '../../repositories/users/users-repository.service';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import { MappedType, PickType } from '@nestjs/mapped-types';
import { SignUpDto } from '../dto/sign-up.dto';
import { validate } from 'class-validator';

@Injectable()
export class EmailAvailableGuard implements CanActivate {
  private validationClass: MappedType<Pick<SignUpDto, 'email'>>;

  constructor(private usersRepositoryService: UsersRepositoryService) {
    this.validationClass = PickType(SignUpDto, ['email'] as const);
  }

  private async validate(email: any): Promise<void> {
    const validationObj = new this.validationClass();
    validationObj.email = email;

    const errors = await validate(validationObj);

    if (errors?.length) {
      throw new BadRequestException({ errors });
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const { email } = req.body;

    await this.validate(email);

    const user = await this.usersRepositoryService.getByEmail(email);

    if (user) {
      throw new BadRequestException({
        message: 'user with provided email already exists',
      });
    }

    return true;
  }
}
