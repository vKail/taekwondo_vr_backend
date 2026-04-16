import { SessionDetail as PrismaSessionDetail } from '@prisma/client';
import { SessionDetailEntity } from '../entities/session-detail.entity';

export class SessionDetailMapper {
  static toEntity(detail: PrismaSessionDetail): SessionDetailEntity {
    return new SessionDetailEntity({
      id: detail.id,
      sessionId: detail.sessionId,
      movementId: detail.movementId,
      movementName: detail.movementName,
      executionData: detail.executionData as Record<string, unknown> | null,
      feedback: detail.feedback as Record<string, unknown> | null,
      accuracy: detail.accuracy,
      order: detail.order,
      createdAt: detail.createdAt,
    });
  }

  static toEntities(details: PrismaSessionDetail[]): SessionDetailEntity[] {
    return details.map((d) => this.toEntity(d));
  }
}
