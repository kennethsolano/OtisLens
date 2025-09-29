import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { LogService } from '../../services/log.service';
import { LogEntry } from '../../models/log-entry.model';

@Component({
  selector: 'app-log-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatChipsModule],
  templateUrl: './log-detail.component.html',
  styleUrl: './log-detail.component.scss'
})
export class LogDetailComponent implements OnInit {
  log?: LogEntry;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private logService: LogService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadLog(id);
    }
  }

  loadLog(id: number): void {
    this.loading = true;
    this.logService.getLog(id).subscribe({
      next: (log) => {
        this.log = log;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading log:', error);
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/logs']);
  }

  viewCorrelation(): void {
    if (this.log?.correlationId) {
      this.router.navigate(['/correlation', this.log.correlationId]);
    }
  }

  getSeverityClass(severity: string): string {
    return `severity-${severity.toLowerCase()}`;
  }
}
