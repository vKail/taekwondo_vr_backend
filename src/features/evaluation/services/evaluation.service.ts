import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../core/database/prisma.service';
import { CreateReferenceMovementDto } from '../dto/create-reference-movement.dto';
import { EvaluateAttemptDto } from '../dto/evaluate-attempt.dto';

@Injectable()
export class EvaluationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async createReferenceMovement(dto: CreateReferenceMovementDto) {
    return this.prisma.referenceMovement.create({
      data: {
        techniqueName: dto.techniqueName,
        description: dto.description,
        jointsData: dto.jointsData,
      },
    });
  }

  async evaluateMovement(dto: EvaluateAttemptDto, userId: number) {
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
    let feedback = 'Evaluación completada';
    let detailedMetrics: any = undefined;

    try {
      const pythonServiceUrl = this.configService.get<string>('PYTHON_SERVICE_URL', 'http://127.0.0.1:8000');
      const response = await fetch(`${pythonServiceUrl}/evaluate`, {
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
      if (data.feedback) {
        feedback = data.feedback;
      }
      if (data.detailed_metrics) {
        detailedMetrics = data.detailed_metrics;
      }
    } catch (error) {
      throw new HttpException(
        'Service Unavailable: Python evaluation engine failed',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    let activeSession = await this.prisma.gameSession.findFirst({
      where: {
        userId: userId,
        startedAt: { gte: oneDayAgo }
      },
      orderBy: { startedAt: 'desc' },
    });

    if (!activeSession) {
      activeSession = await this.prisma.gameSession.create({
        data: {
          userId: userId,
          startedAt: new Date(),
          score: 0,
        },
      });
    }

    const record = await this.prisma.sessionRecord.create({
      data: {
        gameSessionId: activeSession.id,
        referenceMovementId: dto.referenceMovementId,
        executionData: dto.executionData,
        accuracy: score,
        feedback: feedback,
        detailedMetrics: detailedMetrics,
      },
    });

    return {
      accuracy: score,
      feedback: feedback,
      detailedMetrics: detailedMetrics,
    };
  }
}
