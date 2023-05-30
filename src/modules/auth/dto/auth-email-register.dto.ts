import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'Jene' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Merr' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'test1@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;
}
