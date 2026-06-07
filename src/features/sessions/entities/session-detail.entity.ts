export class SessionDetailEntity {
  readonly id: number;
  readonly gameSessionId: number;
  readonly referenceMovementId: number;
  readonly executionData: any;
  readonly accuracy: number;

  constructor(props: SessionDetailEntityProps) {
    this.id = props.id;
    this.gameSessionId = props.gameSessionId;
    this.referenceMovementId = props.referenceMovementId;
    this.executionData = props.executionData;
    this.accuracy = props.accuracy;
  }
}

interface SessionDetailEntityProps {
  id: number;
  gameSessionId: number;
  referenceMovementId: number;
  executionData: any;
  accuracy: number;
}
