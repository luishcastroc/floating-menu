import { Route } from '@angular/router';

import { Dashboard } from './components/dashboard';
import { Home } from './components/home';
import { Messages } from './components/messages';
import { Notifications } from './components/notifications';
import { Profile } from './components/profile';
import { Settings } from './components/settings';

// Host application routes
export const routes: Route[] = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'profile', component: Profile },
  { path: 'settings', component: Settings },
  { path: 'dashboard', component: Dashboard },
  { path: 'messages', component: Messages },
  { path: 'notifications', component: Notifications },
  // Add routes for remote applications here when you have them
  { 
    path: 'naf-link', 
    loadChildren: () => 
      import('lenderLink/Routes')
        .then(m => m.AppRoutes )
  },
  { path: '**', redirectTo: '/home' },
];
