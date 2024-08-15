import { Request } from 'express';
import { User } from '../../repositories/entities/user.entity';
import { Post } from '../../repositories/entities/post.entity';

interface Locals {
  user?: User;
  post?: Post;
}

export interface InnerRequest extends Request {
  user: User;
  locals: Locals;
}
