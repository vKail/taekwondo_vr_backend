import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { GameSession, SessionRecord } from '@prisma/client';
import { CreateSessionData } from '../interfaces/create-session-data.interface';

@Injectable()
export class SessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSessionData): Promise<GameSession> {
    return this.prisma.gameSession.create({
      data: { 
        userId: data.userId, 
        score: data.score ?? 0,
        startedAt: new Date(),
      },
    });
  }

  async findById(id: number): Promise<GameSession | null> {
    return this.prisma.gameSession.findUnique({ where: { id } });
  }

  async findByUserIdPaginated(
    userId: number,
    page: number,
    limit: number,
  ): Promise<{ sessions: GameSession[]; total: number }> {
    const [sessions, total] = await Promise.all([
      this.prisma.gameSession.findMany({
        where: { userId },
        orderBy: { startedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.gameSession.count({ where: { userId } }),
    ]);
    return { sessions, total };
  }

  async complete(id: number, score?: number): Promise<GameSession> {
    return this.prisma.gameSession.update({
      where: { id },
      data: {
        endedAt: new Date(),
        ...(score !== undefined ? { score } : {}),
      },
    });
  }

  async addDetails(
    gameSessionId: number,
    details: any[],
  ): Promise<SessionRecord[]> {
    return this.prisma.$transaction(
      details.map((d) =>
        this.prisma.sessionRecord.create({
          data: {
            gameSessionId,
            referenceMovementId: d.referenceMovementId,
            executionData: d.executionData,
            accuracy: d.accuracy,
          },
        }),
      ),
    );
  }

  async getDetails(gameSessionId: number): Promise<Partial<SessionRecord>[]> {
    return this.prisma.sessionRecord.findMany({
      where: { gameSessionId },
      select: {
        id: true,
        gameSessionId: true,
        referenceMovementId: true,
        accuracy: true,
        feedback: true,
        detailedMetrics: true,
      },
    });
  }
}
