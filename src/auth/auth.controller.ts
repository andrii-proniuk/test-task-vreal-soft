import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsernameAvailableGuard } from './guards/username-available.guard';
import { SignUpDto } from './dto/sign-up.dto';
import { SignUpResponseDto } from './response-dto/sign-up.response-dto';
import { ValidCredentialsGuard } from './guards/valid-credentials.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../repositories/entities/user.entity';
import { LoginResponseDto } from './response-dto/login.response-dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @UseGuards(UsernameAvailableGuard)
  async signUp(@Body() signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  @UseGuards(ValidCredentialsGuard)
  async login(@GetUser() user: User): Promise<LoginResponseDto> {
    return this.authService.login(user);
  }

  @Get('test')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async testAuth(@GetUser() user: User): Promise<any> {
    return user;
  }
}
