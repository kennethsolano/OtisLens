import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogEntry, LogSearchFilter, LogSearchResult, CorrelationGroup, LogStats } from '../models/log-entry.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = '/api/logs';

  constructor(private http: HttpClient) { }

  searchLogs(filter: LogSearchFilter): Observable<LogSearchResult> {
    return this.http.post<LogSearchResult>(`${this.apiUrl}/search`, filter);
  }

  getLog(id: number): Observable<LogEntry> {
    return this.http.get<LogEntry>(`${this.apiUrl}/${id}`);
  }

  getCorrelationGroup(correlationId: string): Observable<CorrelationGroup> {
    return this.http.get<CorrelationGroup>(`${this.apiUrl}/correlation/${correlationId}`);
  }

  getStats(startDate?: string, endDate?: string): Observable<LogStats> {
    let params = new HttpParams();
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    
    return this.http.get<LogStats>(`${this.apiUrl}/stats`, { params });
  }

  cleanupOldLogs(daysToKeep: number = 30): Observable<{ deletedCount: number }> {
    return this.http.delete<{ deletedCount: number }>(`${this.apiUrl}/cleanup?daysToKeep=${daysToKeep}`);
  }
}
