export class SessionEntity {
  readonly id: number;
  readonly userId: number;
  readonly score: number;
  readonly startedAt: Date;
  readonly endedAt: Date | null;
  readonly movementName?: string;

  constructor(props: SessionEntityProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.score = props.score;
    this.startedAt = props.startedAt;
    this.endedAt = props.endedAt ?? null;
    this.movementName = props.movementName;
  }
}

interface SessionEntityProps {
  id: number;
  userId: number;
  score: number;
  startedAt: Date;
  endedAt?: Date | null;
  movementName?: string;
}
