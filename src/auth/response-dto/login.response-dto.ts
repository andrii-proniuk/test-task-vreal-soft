import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LoginResponseDto {
  @Expose()
  id: string;

  @Expose()
  accessToken: string;
}
