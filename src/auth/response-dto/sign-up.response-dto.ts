import { Exclude } from 'class-transformer';
import { LoginResponseDto } from './login.response-dto';

@Exclude()
export class SignUpResponseDto extends LoginResponseDto {}
