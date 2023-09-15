import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  async create(createPostDto: CreatePostDto): Promise<Post> {
    return this.prisma.post.create({
      data: {
        courseId: createPostDto.courseId,
        userId: createPostDto.userId,
        file: createPostDto.file,

        subject: createPostDto.subject,
      },
    });
    
    
  }

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  async findOne(id: number): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { id },
    });
  }
  
  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post > {
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }
  

  async remove(id: number): Promise<Post | null> {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}  
