import { SessionRecord as PrismaSessionRecord } from '@prisma/client';
import { SessionDetailEntity } from '../entities/session-detail.entity';

export class SessionDetailMapper {
  static toEntity(record: Partial<PrismaSessionRecord>): SessionDetailEntity {
    return new SessionDetailEntity({
      id: record.id!,
      gameSessionId: record.gameSessionId!,
      referenceMovementId: record.referenceMovementId!,
      accuracy: record.accuracy!,
      feedback: record.feedback,
      detailedMetrics: record.detailedMetrics,
    });
  }

  static toEntities(records: Partial<PrismaSessionRecord>[]): SessionDetailEntity[] {
    return records.map((record) => this.toEntity(record));
  }
}
