export class SessionDetailEntity {
  readonly id: number;
  readonly sessionId: number;
  readonly movementId: number | null;
  readonly movementName: string;
  readonly executionData: Record<string, unknown> | null;
  readonly feedback: Record<string, unknown> | null;
  readonly accuracy: number | null;
  readonly order: number;
  readonly createdAt: Date;

  constructor(props: SessionDetailEntityProps) {
    this.id = props.id;
    this.sessionId = props.sessionId;
    this.movementId = props.movementId ?? null;
    this.movementName = props.movementName;
    this.executionData = props.executionData ?? null;
    this.feedback = props.feedback ?? null;
    this.accuracy = props.accuracy ?? null;
    this.order = props.order;
    this.createdAt = props.createdAt;
  }
}

interface SessionDetailEntityProps {
  id: number;
  sessionId: number;
  movementId?: number | null;
  movementName: string;
  executionData?: Record<string, unknown> | null;
  feedback?: Record<string, unknown> | null;
  accuracy?: number | null;
  order: number;
  createdAt: Date;
}
