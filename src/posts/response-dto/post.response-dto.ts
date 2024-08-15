import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
class AuthorDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

@Exclude()
export class PostResponseDto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => AuthorDto)
  user: AuthorDto;

  @Expose()
  title: string;

  @Expose()
  text: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}
