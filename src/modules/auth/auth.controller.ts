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
import { ResponseDto } from './dto/login-response.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: AuthEmailLoginDto,
    @Res() res,
  ): Promise<ResponseDto> {
    const userData = await this.authService.validateLogin(loginDto);
    // console.log(userData);
    res.cookie('RefreshToken', userData.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.send({
      user: instanceToPlain(userData.data),
      accessToken: userData.accessToken,
    });
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  register(@Body() registerDto: AuthRegisterLoginDto): Promise<User> {
    return this.authService.register(registerDto);
  }
}
