import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { LogService } from '../../services/log.service';
import { LogStats } from '../../models/log-entry.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  stats?: LogStats;
  loading = true;
  error: string | null = null;

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    if (this.loading && this.stats) {
      return; // Prevent concurrent requests
    }
    
    this.loading = true;
    this.error = null;
    
    this.logService.getStats().subscribe({
      next: (stats) => {
        this.stats = stats;
        this.loading = false;
        this.error = null;
      },
      error: (error) => {
        console.error('Error loading stats:', error);
        this.loading = false;
        this.error = 'Failed to load statistics. Please check that the backend is running.';
      }
    });
  }

  getEnvironmentKeys(): string[] {
    return this.stats?.logsByEnvironment ? Object.keys(this.stats.logsByEnvironment) : [];
  }

  getSeverityKeys(): string[] {
    return this.stats?.logsBySeverity ? Object.keys(this.stats.logsBySeverity) : [];
  }

  getModuleKeys(): string[] {
    return this.stats?.logsByModule ? Object.keys(this.stats.logsByModule) : [];
  }
}
