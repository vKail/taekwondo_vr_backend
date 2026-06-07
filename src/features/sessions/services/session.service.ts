import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { SessionRepository } from '../repositories/session.repository';
import { SessionEntity } from '../entities/session.entity';
import { SessionDetailEntity } from '../entities/session-detail.entity';
import { SessionMapper } from '../mappers/session.mapper';
import { SessionDetailMapper } from '../mappers/session-detail.mapper';
import { CreateSessionDto } from '../dto/create-session.dto';
import { AddDetailsDto } from '../dto/add-details.dto';
import { CompleteSessionDto } from '../dto/complete-session.dto';

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async create(userId: number, dto: CreateSessionDto): Promise<SessionEntity> {
    const session = await this.sessionRepository.create({
      userId,
      score: dto.score,
    });
    return SessionMapper.toEntity(session);
  }

  async addDetails(
    sessionId: number,
    userId: number,
    dto: AddDetailsDto,
  ): Promise<SessionDetailEntity[]> {
    const session = await this.sessionRepository.findById(sessionId);
    if (!session) throw new NotFoundException('Session not found');
    if (session.userId !== userId) throw new ForbiddenException('Not authorized');

    const details = await this.sessionRepository.addDetails(
      sessionId,
      dto.details.map((d) => ({
        referenceMovementId: d.referenceMovementId,
        executionData: d.executionData,
        accuracy: d.accuracy,
      })),
    );
    return SessionDetailMapper.toEntities(details);
  }

  async complete(
    sessionId: number,
    userId: number,
    dto: CompleteSessionDto,
  ): Promise<SessionEntity> {
    const session = await this.sessionRepository.findById(sessionId);
    if (!session) throw new NotFoundException('Session not found');
    if (session.userId !== userId) throw new ForbiddenException('Not authorized');

    const completed = await this.sessionRepository.complete(sessionId, dto.score);
    return SessionMapper.toEntity(completed);
  }

  async getSession(
    sessionId: number,
    userId: number,
  ): Promise<{ session: SessionEntity; details: SessionDetailEntity[] }> {
    const session = await this.sessionRepository.findById(sessionId);
    if (!session) throw new NotFoundException('Session not found');
    if (session.userId !== userId) throw new ForbiddenException('Not authorized');

    const details = await this.sessionRepository.getDetails(sessionId);
    return {
      session: SessionMapper.toEntity(session),
      details: SessionDetailMapper.toEntities(details),
    };
  }

  async getHistory(
    userId: number,
    page: number,
    limit: number,
  ): Promise<{ sessions: SessionEntity[]; total: number }> {
    const result = await this.sessionRepository.findByUserIdPaginated(userId, page, limit);
    return {
      sessions: result.sessions.map((s) => SessionMapper.toEntity(s)),
      total: result.total,
    };
  }
}
