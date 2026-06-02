import { IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReferenceMovementDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  techniqueName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  jointsData: Record<string, any>;
}
