export interface SessionDetailData {
  movementId?: number | null;
  movementName: string;
  executionData?: Record<string, unknown> | null;
  feedback?: Record<string, unknown> | null;
  accuracy?: number | null;
  order: number;
}

export interface AddSessionDetailsData {
  sessionId: number;
  details: SessionDetailData[];
}
