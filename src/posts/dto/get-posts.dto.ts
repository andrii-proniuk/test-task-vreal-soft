import { IsEnum, IsIn, IsOptional, IsString } from 'class-validator';
import { PostSortEnum } from '../../repositories/entities/post.entity';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class GetPostsDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(PostSortEnum)
  sort?: PostSortEnum = PostSortEnum.id;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  direction?: 'ASC' | 'DESC' = 'DESC';
}
