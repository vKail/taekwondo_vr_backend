import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { Session, SessionDetail, SessionStatus } from '@prisma/client';
import { CreateSessionData } from '../interfaces/create-session-data.interface';
import { SessionDetailData } from '../interfaces/add-session-details-data.interface';

@Injectable()
export class SessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSessionData): Promise<Session> {
    return this.prisma.session.create({
      data: { userId: data.userId, score: data.score ?? 0 },
    });
  }

  async findById(id: number): Promise<Session | null> {
    return this.prisma.session.findUnique({ where: { id } });
  }

  async findByUserIdPaginated(
    userId: number,
    page: number,
    limit: number,
  ): Promise<{ sessions: Session[]; total: number }> {
    const [sessions, total] = await Promise.all([
      this.prisma.session.findMany({
        where: { userId },
        orderBy: { startedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.session.count({ where: { userId } }),
    ]);
    return { sessions, total };
  }

  async complete(id: number, score?: number): Promise<Session> {
    return this.prisma.session.update({
      where: { id },
      data: {
        status: SessionStatus.COMPLETED,
        endedAt: new Date(),
        score: score ?? undefined,
      },
    });
  }

  async addDetails(
    sessionId: number,
    details: SessionDetailData[],
  ): Promise<SessionDetail[]> {
    return this.prisma.$transaction(
      details.map((d) =>
        this.prisma.sessionDetail.create({
          data: {
            sessionId,
            movementId: d.movementId,
            movementName: d.movementName,
            executionData: (d.executionData as any) ?? undefined,
            feedback: (d.feedback as any) ?? undefined,
            accuracy: d.accuracy,
            order: d.order,
          },
        }),
      ),
    );
  }

  async getDetails(sessionId: number): Promise<SessionDetail[]> {
    return this.prisma.sessionDetail.findMany({
      where: { sessionId },
      orderBy: { order: 'asc' },
    });
  }
}
