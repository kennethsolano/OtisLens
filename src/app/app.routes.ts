import { Routes } from '@angular/router';
import { LogListComponent } from './components/log-list/log-list.component';
import { LogDetailComponent } from './components/log-detail/log-detail.component';
import { CorrelationViewComponent } from './components/correlation-view/correlation-view.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/logs', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'logs', component: LogListComponent },
  { path: 'logs/:id', component: LogDetailComponent },
  { path: 'correlation/:id', component: CorrelationViewComponent }
];
