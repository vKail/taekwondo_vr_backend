export class SessionDetailEntity {
  readonly id: number;
  readonly gameSessionId: number;
  readonly referenceMovementId: number;
  readonly accuracy: number;
  readonly feedback: string | null;
  readonly detailedMetrics: any | null;

  constructor(props: SessionDetailEntityProps) {
    this.id = props.id;
    this.gameSessionId = props.gameSessionId;
    this.referenceMovementId = props.referenceMovementId;
    this.accuracy = props.accuracy;
    this.feedback = props.feedback || null;
    this.detailedMetrics = props.detailedMetrics || null;
  }
}

interface SessionDetailEntityProps {
  id: number;
  gameSessionId: number;
  referenceMovementId: number;
  accuracy: number;
  feedback?: string | null;
  detailedMetrics?: any | null;
}
