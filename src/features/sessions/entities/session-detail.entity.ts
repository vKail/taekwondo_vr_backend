export class SessionDetailEntity {
  readonly id: number;
  readonly gameSessionId: number;
  readonly referenceMovementId: number;
  readonly accuracy: number;
  readonly movementName?: string;
  readonly feedback?: string;
  readonly detailedMetrics?: any;

  constructor(props: SessionDetailEntityProps) {
    this.id = props.id;
    this.gameSessionId = props.gameSessionId;
    this.referenceMovementId = props.referenceMovementId;
    this.accuracy = props.accuracy;
    this.movementName = props.movementName;
    this.feedback = props.feedback;
    this.detailedMetrics = props.detailedMetrics;
  }
}

interface SessionDetailEntityProps {
  id: number;
  gameSessionId: number;
  referenceMovementId: number;
  accuracy: number;
  movementName?: string;
  feedback?: string;
  detailedMetrics?: any;
}
