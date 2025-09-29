import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { LogService } from '../../services/log.service';
import { LogEntry, LogSearchFilter } from '../../models/log-entry.model';

@Component({
  selector: 'app-log-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  templateUrl: './log-list.component.html',
  styleUrl: './log-list.component.scss'
})
export class LogListComponent implements OnInit {
  logs: LogEntry[] = [];
  loading = false;
  totalCount = 0;
  error: string | null = null;

  filter: LogSearchFilter = {
    pageNumber: 1,
    pageSize: 25,
    sortBy: 'Timestamp',
    sortDescending: true
  };

  environments = ['local', 'dev', 'staging', 'prod'];
  layers = ['frontend', 'backend', 'database'];
  severities = ['error', 'warning', 'info', 'debug'];

  constructor(
    private logService: LogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchLogs();
  }

  searchLogs(): void {
    // Prevent concurrent requests
    if (this.loading) {
      return;
    }
    
    this.loading = true;
    this.error = null;
    
    this.logService.searchLogs(this.filter).subscribe({
      next: (result) => {
        this.logs = result.logs;
        this.totalCount = result.totalCount;
        this.loading = false;
        this.error = null;
      },
      error: (error) => {
        console.error('Error loading logs:', error);
        this.loading = false;
        this.error = 'Failed to load logs. Please check that the backend is running and try again.';
        this.logs = [];
        this.totalCount = 0;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.filter.pageNumber = event.pageIndex + 1;
    this.filter.pageSize = event.pageSize;
    this.searchLogs();
  }

  viewLog(log: LogEntry): void {
    this.router.navigate(['/logs', log.id]);
  }

  viewCorrelation(correlationId: string): void {
    this.router.navigate(['/correlation', correlationId]);
  }

  resetFilters(): void {
    this.filter = {
      pageNumber: 1,
      pageSize: 25,
      sortBy: 'Timestamp',
      sortDescending: true
    };
    this.searchLogs();
  }

  getSeverityClass(severity: string): string {
    return `severity-${severity.toLowerCase()}`;
  }

  getLayerClass(layer: string): string {
    return `layer-${layer.toLowerCase()}`;
  }
}
