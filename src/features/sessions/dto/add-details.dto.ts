import {
  IsArray,
  ValidateNested,
  IsNumber,
  IsString,
  IsOptional,
  IsObject,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SessionDetailItemDto {
  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  movementId?: number;

  @ApiProperty({ example: 'front kick' })
  @IsString()
  movementName: string;

  @ApiPropertyOptional({ example: { position: [1, 2, 3] } })
  @IsOptional()
  @IsObject()
  executionData?: Record<string, unknown>;

  @ApiPropertyOptional({ example: { correct: true } })
  @IsOptional()
  @IsObject()
  feedback?: Record<string, unknown>;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  accuracy?: number;

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  @Min(1)
  order: number;
}

export class AddDetailsDto {
  @ApiProperty({ type: [SessionDetailItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SessionDetailItemDto)
  details: SessionDetailItemDto[];
}
