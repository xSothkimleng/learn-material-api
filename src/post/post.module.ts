import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports:[ConfigModule.forRoot()],
  controllers: [PostController],
  providers: [PostService,PrismaService ],
})
export class PostModule {}
