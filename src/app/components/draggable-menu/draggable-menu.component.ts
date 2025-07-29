import { Component, viewChild, ElementRef, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-draggable-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      #menuContainer
      class="floating-menu"
      [class.expanded]="isExpanded()"
      [style.left.px]="position().x"
      [style.top.px]="position().y"
      (mousedown)="startDrag($event)"
      (document:mousemove)="onMouseMove($event)"
      (document:mouseup)="onMouseUp($event)"
      [@menuAnimation]="isExpanded() ? 'expanded' : 'collapsed'"
    >
      <!-- Menu Button -->
      <div 
        class="menu-button"
        (click)="toggleMenu($event)"
        [class.active]="isExpanded()"
      >
        <div class="hamburger-line" [class.active]="isExpanded()"></div>
        <div class="hamburger-line" [class.active]="isExpanded()"></div>
        <div class="hamburger-line" [class.active]="isExpanded()"></div>
      </div>

      <!-- Menu Items -->
      <div class="menu-items" *ngIf="isExpanded()">
        <div 
          *ngFor="let item of menuItems(); let i = index"
          class="menu-item"
          [style.animation-delay.ms]="i * 50"
          (click)="navigateTo(item.route, $event)"
        >
          <div class="menu-icon">{{ item.icon }}</div>
          <span class="menu-label">{{ item.label }}</span>
        </div>
      </div>

      <!-- Backdrop -->
      <div 
        class="menu-backdrop" 
        *ngIf="isExpanded()"
        (click)="closeMenu()"
      ></div>
    </div>
  `,
  styleUrls: ['./draggable-menu.component.css'],
  animations: [
    trigger('menuAnimation', [
      state('collapsed', style({
        transform: 'scale(1)',
        borderRadius: '50%'
      })),
      state('expanded', style({
        transform: 'scale(1.1)',
        borderRadius: '20px'
      })),
      transition('collapsed => expanded', [
        animate('300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)')
      ]),
      transition('expanded => collapsed', [
        animate('200ms ease-in-out')
      ])
    ])
  ]
})
export class DraggableMenuComponent {
  private router = inject(Router);
  
  // ViewChild signal
  menuContainer = viewChild.required<ElementRef>('menuContainer');

  // Signals for reactive state
  isExpanded = signal(false);
  isDragging = signal(false);
  dragMoved = signal(false);
  position = signal({ x: 20, y: 100 });
  
  private dragStart = { x: 0, y: 0 };
  
  menuItems = signal<MenuItem[]>([
    { icon: '🏠', label: 'Home', route: '/home' },
    { icon: '👤', label: 'Profile', route: '/profile' },
    { icon: '⚙️', label: 'Settings', route: '/settings' },
    { icon: '📊', label: 'Dashboard', route: '/dashboard' },
    { icon: '💬', label: 'Messages', route: '/messages' },
    { icon: '🔔', label: 'Notifications', route: '/notifications' }
  ]);

  constructor() {
    // Effect to center menu on initialization
    effect(() => {
      if (this.menuContainer()) {
        this.centerMenu();
      }
    });
  }

  private centerMenu() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    this.position.set({
      x: windowWidth - 80,
      y: windowHeight / 2 - 30
    });
  }

  startDrag(event: MouseEvent) {
    if (this.isExpanded()) return;
    
    this.isDragging.set(true);
    this.dragMoved.set(false);
    this.dragStart.x = event.clientX - this.position().x;
    this.dragStart.y = event.clientY - this.position().y;
    
    event.preventDefault();
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging()) return;

    this.dragMoved.set(true);
    const newX = event.clientX - this.dragStart.x;
    const newY = event.clientY - this.dragStart.y;

    // Keep menu within viewport bounds
    const menuWidth = 60;
    const menuHeight = 60;
    
    const boundedX = Math.max(0, Math.min(window.innerWidth - menuWidth, newX));
    const boundedY = Math.max(0, Math.min(window.innerHeight - menuHeight, newY));
    
    this.position.set({ x: boundedX, y: boundedY });
  }

  onMouseUp(event: MouseEvent) {
    this.isDragging.set(false);
  }

  toggleMenu(event: MouseEvent) {
    if (this.dragMoved()) {
      this.dragMoved.set(false);
      return;
    }
    
    event.stopPropagation();
    this.isExpanded.update(expanded => !expanded);
  }

  closeMenu() {
    this.isExpanded.set(false);
  }

  navigateTo(route: string, event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate([route]);
    this.closeMenu();
  }
}