import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { TTag } from '../../types';

type TCreateTag = Omit<TTag, 'id' | 'user_id' | 'created_at' | 'updated_at'>;

export class CreateTagDto implements TCreateTag {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
