import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { Status } from '@prisma/client';

export class CreatePostDto {
  @IsNotEmpty()
  @IsInt()
  courseId: number;

  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  file: string;

  
}
