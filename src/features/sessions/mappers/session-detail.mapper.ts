import { SessionRecord as PrismaSessionRecord } from '@prisma/client';
import { SessionDetailEntity } from '../entities/session-detail.entity';

export class SessionDetailMapper {
  static toEntity(record: PrismaSessionRecord): SessionDetailEntity {
    return new SessionDetailEntity({
      id: record.id,
      gameSessionId: record.gameSessionId,
      referenceMovementId: record.referenceMovementId,
      executionData: record.executionData,
      accuracy: record.accuracy,
    });
  }

  static toEntities(records: PrismaSessionRecord[]): SessionDetailEntity[] {
    return records.map((record) => this.toEntity(record));
  }
}
