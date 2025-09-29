export interface LogEntry {
  id: number;
  timestamp: string;
  correlationId?: string;
  environment: string;
  sourceApp: string;
  layer: string;
  severity: string;
  module?: string;
  component?: string;
  message: string;
  stackTrace?: string;
  filePath?: string;
  lineNumber?: number;
  methodName?: string;
  userId?: string;
  sessionId?: string;
  requestPath?: string;
  httpMethod?: string;
  statusCode?: number;
  additionalData?: string;
  createdAt: string;
}

export interface LogSearchFilter {
  searchText?: string;
  environments?: string[];
  sourceApps?: string[];
  layers?: string[];
  severities?: string[];
  modules?: string[];
  correlationId?: string;
  startDate?: string;
  endDate?: string;
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortDescending: boolean;
}

export interface LogSearchResult {
  logs: LogEntry[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface CorrelationGroup {
  correlationId: string;
  firstLogTimestamp: string;
  lastLogTimestamp: string;
  environment: string;
  sourceApp: string;
  hasError: boolean;
  logCount: number;
  frontendCount: number;
  backendCount: number;
  summary?: string;
  logs: LogEntry[];
}

export interface LogStats {
  totalLogs: number;
  errorCount: number;
  warningCount: number;
  infoCount: number;
  frontendCount: number;
  backendCount: number;
  logsByEnvironment: { [key: string]: number };
  logsBySeverity: { [key: string]: number };
  logsByModule: { [key: string]: number };
  topErrors: TopError[];
}

export interface TopError {
  message: string;
  count: number;
  component?: string;
  lastOccurrence: string;
}
