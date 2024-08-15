import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PostResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  text: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}
