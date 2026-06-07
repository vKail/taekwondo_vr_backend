import { IsNumber, IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EvaluateAttemptDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  gameSessionId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  referenceMovementId: number;

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  executionData: Record<string, any>;
}
