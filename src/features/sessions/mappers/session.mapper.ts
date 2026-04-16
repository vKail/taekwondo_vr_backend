import { Session as PrismaSession } from '@prisma/client';
import { SessionEntity, SessionStatus } from '../entities/session.entity';

export class SessionMapper {
  static toEntity(session: PrismaSession): SessionEntity {
    return new SessionEntity({
      id: session.id,
      userId: session.userId,
      score: session.score ?? null,
      status: session.status as SessionStatus,
      startedAt: session.startedAt,
      endedAt: session.endedAt,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
    });
  }
}
