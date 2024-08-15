import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepositoryService } from '../repositories/users/users-repository.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignUpResponseDto } from './response-dto/sign-up.response-dto';
import { plainToInstance } from 'class-transformer';
import { LoginResponseDto } from './response-dto/login.response-dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../repositories/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersRepositoryService: UsersRepositoryService,
    private jwtService: JwtService,
  ) {}

  private generateToken(user: User): string {
    const payload = {
      sub: user.id,
    };

    return this.jwtService.sign(payload);
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersRepositoryService.getByUsername(username);

    console.log({ foundUser: user });

    if (!user) {
      throw new BadRequestException({
        message: 'username and/or password invalid',
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new BadRequestException({
        message: 'username and/or password invalid',
      });
    }

    return user;
  }

  async signUp(signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    const user = await this.usersRepositoryService.create(signUpDto);

    const accessToken = this.generateToken(user);

    return plainToInstance(SignUpResponseDto, { ...user, accessToken });
  }

  async login(user: User): Promise<LoginResponseDto> {
    const accessToken = this.generateToken(user);

    return plainToInstance(LoginResponseDto, { ...user, accessToken });
  }
}
