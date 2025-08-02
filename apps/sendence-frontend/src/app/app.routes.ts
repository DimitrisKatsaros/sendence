import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'chat', pathMatch: 'full' },
  { path: '**', redirectTo: 'chat', pathMatch: 'full' },
];
