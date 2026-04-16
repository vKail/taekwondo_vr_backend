export enum SessionStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export class SessionEntity {
  readonly id: number;
  readonly userId: number;
  readonly score: number | null;
  readonly status: SessionStatus;
  readonly startedAt: Date;
  readonly endedAt: Date | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: SessionEntityProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.score = props.score ?? null;
    this.status = props.status;
    this.startedAt = props.startedAt;
    this.endedAt = props.endedAt ?? null;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}

interface SessionEntityProps {
  id: number;
  userId: number;
  score?: number | null;
  status: SessionStatus;
  startedAt: Date;
  endedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
