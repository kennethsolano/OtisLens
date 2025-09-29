import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { LogService } from '../../services/log.service';
import { CorrelationGroup, LogEntry } from '../../models/log-entry.model';

@Component({
  selector: 'app-correlation-view',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatChipsModule],
  templateUrl: './correlation-view.component.html',
  styleUrl: './correlation-view.component.scss'
})
export class CorrelationViewComponent implements OnInit {
  correlationGroup?: CorrelationGroup;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private logService: LogService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCorrelation(id);
    }
  }

  loadCorrelation(id: string): void {
    this.loading = true;
    this.logService.getCorrelationGroup(id).subscribe({
      next: (group) => {
        this.correlationGroup = group;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading correlation:', error);
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/logs']);
  }

  viewLogDetail(log: LogEntry): void {
    this.router.navigate(['/logs', log.id]);
  }

  getSeverityClass(severity: string): string {
    return `severity-${severity.toLowerCase()}`;
  }

  getLayerClass(layer: string): string {
    return `layer-${layer.toLowerCase()}`;
  }
}
