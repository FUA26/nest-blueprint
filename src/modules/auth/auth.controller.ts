import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthRegisterLoginDto } from './dto/auth-email-register.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: AuthEmailLoginDto, @Res() res): Promise<any> {
    const userData = await this.authService.validateLogin(loginDto);

    res.cookie('RefreshToken', userData.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.send({
      data: instanceToPlain(userData.data),
      accessToken: userData.accessToken,
    });
  }

  @Post('register')
  register(@Body() registerDto: AuthRegisterLoginDto): Promise<User> {
    return this.authService.register(registerDto);
  }
}
