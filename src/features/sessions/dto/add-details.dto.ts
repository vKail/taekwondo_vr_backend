import { IsArray, ValidateNested, IsNumber, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SessionRecordItemDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  referenceMovementId: number;

  @ApiProperty({ example: { position: [1, 2, 3] } })
  @IsObject()
  executionData: Record<string, unknown>;

  @ApiProperty({ type: Number })
  @IsNumber()
  accuracy: number;
}

export class AddDetailsDto {
  @ApiProperty({ type: [SessionRecordItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SessionRecordItemDto)
  details: SessionRecordItemDto[];
}
