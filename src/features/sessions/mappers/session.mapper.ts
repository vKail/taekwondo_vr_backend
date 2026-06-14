import { GameSession as PrismaSession } from '@prisma/client';
import { SessionEntity } from '../entities/session.entity';

export class SessionMapper {
  static toEntity(session: any): SessionEntity {
    return new SessionEntity({
      id: session.id,
      userId: session.userId,
      score: session.score,
      startedAt: session.startedAt,
      endedAt: session.endedAt,
      movementName: session.records?.[0]?.referenceMovement?.techniqueName,
    });
  }
}
