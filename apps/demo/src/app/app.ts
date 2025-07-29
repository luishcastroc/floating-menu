import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DraggableMenu } from './components/draggable-menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DraggableMenu],
  template: `
    <div class="app-container">
      <router-outlet />
      <app-draggable-menu />
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
