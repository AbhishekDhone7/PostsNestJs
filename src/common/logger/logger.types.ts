/** Structured details printed before a controller handles an HTTP request. */
export interface HttpRequestLog {
  timestamp: string;
  method: string;
  url: string;
  params: Record<string, unknown>;
  query: Record<string, unknown>;
  body: unknown;
  headers: Record<string, unknown>;
  ipAddress: string | undefined;
  userAgent: string | undefined;
  requestSize: number;
  curl: string;
}

/** Structured details printed after a successful HTTP response is produced. */
export interface HttpResponseLog {
  timestamp: string;
  method: string;
  url: string;
  statusCode: number;
  body: unknown;
  responseTime: number;
  responseSize: number;
}

/** Structured details printed when request handling throws an exception. */
export interface HttpErrorLog {
  timestamp: string;
  method: string;
  url: string;
  statusCode: number;
  responseTime: number;
  exceptionName: string;
  exceptionMessage: string;
  stackTrace: string | undefined;
}
