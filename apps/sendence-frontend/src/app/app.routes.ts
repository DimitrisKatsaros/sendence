import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'chat',
    loadComponent: () =>
      import('./features/chat/chat-room/chat-room.component').then((c) => c.ChatRoomComponent),
  },
  { path: '', redirectTo: 'chat', pathMatch: 'full' },
  { path: '**', redirectTo: 'chat', pathMatch: 'full' },
];
