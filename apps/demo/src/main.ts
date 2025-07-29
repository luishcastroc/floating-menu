import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes, Route } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { DraggableMenuComponent } from './app/components/draggable-menu/draggable-menu.component';
import { HomeComponent } from './app/components/home/home.component';
import { ProfileComponent } from './app/components/profile/profile.component';
import { SettingsComponent } from './app/components/settings/settings.component';
import { DashboardComponent } from './app/components/dashboard/dashboard.component';
import { MessagesComponent } from './app/components/messages/messages.component';
import { NotificationsComponent } from './app/components/notifications/notifications.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DraggableMenuComponent],
  template: `
    <div class="app-container">
      <router-outlet></router-outlet>
      <app-draggable-menu></app-draggable-menu>
    </div>
  `,
  styles: [
    `
      .app-container {
        width: 100%;
        height: 100vh;
        overflow: hidden;
      }
    `,
  ],
})
export class App {}

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' } as Route,
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: '**', redirectTo: '/home' },
];

bootstrapApplication(App, {
  providers: [provideRouter(routes), provideAnimations()],
});
