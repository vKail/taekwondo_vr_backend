import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { SessionRepository } from '../../sessions/repositories/session.repository';
import { SessionEntity } from '../../sessions/entities/session.entity';
import { SessionDetailEntity } from '../../sessions/entities/session-detail.entity';
import { SessionMapper } from '../../sessions/mappers/session.mapper';
import { SessionDetailMapper } from '../../sessions/mappers/session-detail.mapper';

@Injectable()
export class HistoryService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async getHistory(
    userId: number,
    page: number,
    limit: number,
  ): Promise<{ sessions: SessionEntity[]; total: number }> {
    const result = await this.sessionRepository.findByUserIdPaginated(
      userId,
      page,
      limit,
    );
    return {
      sessions: result.sessions.map(SessionMapper.toEntity),
      total: result.total,
    };
  }

  async getSessionDetails(
    sessionId: number,
    userId: number,
  ): Promise<{ session: SessionEntity; details: SessionDetailEntity[] }> {
    const session = await this.sessionRepository.findById(sessionId);
    if (!session) throw new NotFoundException('Session not found');
    if (session.userId !== userId)
      throw new ForbiddenException('Not authorized');

    const details = await this.sessionRepository.getDetails(sessionId);
    return {
      session: SessionMapper.toEntity(session),
      details: SessionDetailMapper.toEntities(details),
    };
  }
}
