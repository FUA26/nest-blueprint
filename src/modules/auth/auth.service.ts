import {
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { AuthRegisterLoginDto } from './dto/auth-email-register.dto';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  @UseInterceptors(ClassSerializerInterceptor)
  async validateUser(email: string, password: string): Promise<User> {
    const getUser = await this.usersRepository.findOne({
      where: { email },
    });

    if (!getUser) {
      throw new HttpException('message', HttpStatus.BAD_REQUEST, {
        cause: new Error('Some Error'),
      });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      getUser.hashPassword,
    );

    if (!isValidPassword) {
      throw new HttpException('message', HttpStatus.BAD_REQUEST, {
        cause: new Error('Some Error'),
      });
    }
    return getUser;
  }

  async validateLogin(loginDto: AuthEmailLoginDto): Promise<any> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    const payload = {
      sub: user.id,
      firdtName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    const token = await this.getJwtToken(payload);

    return {
      data: user,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    };
  }

  async validateRefreshToken(email): Promise<any> {
    // const user = await this.prisma.user.findUnique({
    //   where: {
    //     email: email,
    //   },
    // });

    // if (!user) {
    //   throw new HttpException('message', HttpStatus.BAD_REQUEST, {
    //     cause: new Error('Token Expired'),
    //   });
    // }

    // const payload = {
    //   sub: user.id,
    //   name: user.name,
    //   email: user.email,
    // };

    // const tokens = await this.getJwtAccessToken(payload);
    const tokens = {
      accessToken: 'tokens.accessToken',
      refreshToken: 'tokens.refreshToken',
    };
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async register(createDto: AuthRegisterLoginDto): Promise<User> {
    const checkUser = await this.usersRepository.findOne({
      where: { email: createDto.email },
    });

    if (checkUser) {
      throw new HttpException('message', HttpStatus.BAD_REQUEST, {
        cause: new Error('User already exists'),
      });
    }

    const hashedPassword = await bcrypt.hash(createDto.password, 10);

    const user = await this.usersRepository.create({
      firstName: createDto.firstName,
      lastName: createDto.lastName,
      email: createDto.email,
      hashPassword: hashedPassword,
      hashToken: '',
    });

    return this.usersRepository.save(user);
  }

  async getJwtToken(user: any) {
    const payload = {
      ...user,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload),
      this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
