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
export class UsernameAvailableGuard implements CanActivate {
  private validationClass: MappedType<Pick<SignUpDto, 'username'>>;

  constructor(private usersRepositoryService: UsersRepositoryService) {
    this.validationClass = PickType(SignUpDto, ['username'] as const);
  }

  private async validate(username: any): Promise<void> {
    const validationObj = new this.validationClass();
    validationObj.username = username;

    const errors = await validate(validationObj);

    if (errors?.length) {
      throw new BadRequestException({ errors });
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    const { username } = req.body;

    await this.validate(username);

    const user = await this.usersRepositoryService.getByUsername(username);

    if (user) {
      throw new BadRequestException({
        message: 'user with provided username already exists',
      });
    }

    return true;
  }
}
