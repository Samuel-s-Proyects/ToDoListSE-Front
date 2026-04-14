export interface NormalizedError {
  code: string;
  message: string;
  details: unknown[];
  traceId?: string;
}
