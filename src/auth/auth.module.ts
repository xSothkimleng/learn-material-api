import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy';


@Module({
  imports:[JwtModule.register({}), ConfigModule],
  controllers: [AuthController],
  providers: [AuthService,PrismaService, JwtStrategy],
})
export class AuthModule {}
