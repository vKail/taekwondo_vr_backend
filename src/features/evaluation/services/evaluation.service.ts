import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { CreateReferenceMovementDto } from '../dto/create-reference-movement.dto';
import { EvaluateAttemptDto } from '../dto/evaluate-attempt.dto';

@Injectable()
export class EvaluationService {
  constructor(private readonly prisma: PrismaService) {}

  async createReferenceMovement(dto: CreateReferenceMovementDto) {
    return this.prisma.referenceMovement.create({
      data: {
        techniqueName: dto.techniqueName,
        description: dto.description,
        jointsData: dto.jointsData,
      },
    });
  }

  async evaluateMovement(dto: EvaluateAttemptDto) {
    const reference = await this.prisma.referenceMovement.findUnique({
      where: { id: dto.referenceMovementId },
    });

    if (!reference) {
      throw new NotFoundException('Reference movement not found');
    }

    const payload = {
      user_data: dto.executionData,
      master_data: reference.jointsData,
      movement_type: reference.techniqueName,
    };

    let score = 0;
    try {
      const response = await fetch('http://127.0.0.1:8000/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Python service responded with status: ${response.status}`);
      }

      const data = await response.json() as any;
      score = data.score;
      if (typeof score !== 'number') {
         score = parseFloat(data.score) || 0;
      }
    } catch (error) {
      throw new HttpException(
        'Service Unavailable: Python evaluation engine failed',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    const record = await this.prisma.sessionRecord.create({
      data: {
        gameSessionId: dto.gameSessionId,
        referenceMovementId: dto.referenceMovementId,
        executionData: dto.executionData,
        accuracy: score,
      },
    });

    return {
      accuracy: score,
      feedback: 'Evaluación completada',
    };
  }
}
