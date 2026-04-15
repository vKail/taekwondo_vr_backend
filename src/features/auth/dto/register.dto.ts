import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'taekwondo_master' })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ example: 'SuperSecurePass123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ example: 'John', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'Doe', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: '2000-01-01', required: false })
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  birthdate?: Date;
}
