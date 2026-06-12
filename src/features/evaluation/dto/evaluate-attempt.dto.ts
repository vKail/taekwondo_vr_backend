import { IsNumber, IsNotEmpty, IsObject, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EvaluateAttemptDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  referenceMovementId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  techniqueName?: string;

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  executionData: Record<string, any>;
}
