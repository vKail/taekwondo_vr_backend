import { IsOptional, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CompleteSessionDto {
  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  score?: number;
}
