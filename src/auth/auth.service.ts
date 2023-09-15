import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const hash = await argon.hash(createAuthDto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: createAuthDto.email,
          hash,
          userName: createAuthDto.userName,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('This Email is taken');
        }
      }
      throw error;
    }
  }
  async login(createAuthDto: CreateAuthDto) {
    // find the email from the db
    const user = await this.prisma.user.findUnique({
      where: {
        email: createAuthDto.email,
      },
    });
    // check if the email exist or not
    if (!user) {
      throw new ForbiddenException('This email or password incorrect');
    }
    // compare the password
    const pwMatches = await argon.verify(user.hash, createAuthDto.password);
    //check the password does not matches the password in db
    if (!pwMatches) {
      throw new ForbiddenException('This email or password incorrect');
    }
    //not to display hash
    // delete user.hash;

    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '20m',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }
}
