import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserResponseDto } from './response-dto/user.response-dto';
import { GetUsersDto } from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserExistsGuard } from './guards/user-exists.guard';
import { CanModifyUserGuard } from './guards/can-modify-user.guard';
import { UsernameAvailableGuard } from './guards/username-available.guard';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async get(@Query() getUsersDto: GetUsersDto): Promise<UserResponseDto[]> {
    return this.usersService.get(getUsersDto);
  }

  @Get(':id')
  @UseGuards(UserExistsGuard)
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    return this.usersService.getById(id);
  }

  @Patch(':id')
  @UseGuards(UserExistsGuard, CanModifyUserGuard, UsernameAvailableGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(UserExistsGuard, CanModifyUserGuard)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    return this.usersService.delete(id);
  }
}
