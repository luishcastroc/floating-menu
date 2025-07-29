import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';

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
      [class.collapsed]="!isExpanded()"
      [style.left.px]="position().x"
      [style.top.px]="position().y"
      (mousedown)="startDrag($event)"
      (touchstart)="startTouchDrag($event)"
      (document:mousemove)="onMouseMove($event)"
      (document:touchmove)="onTouchMove($event)"
      (document:mouseup)="onMouseUp($event)"
      (document:touchend)="onTouchEnd($event)"
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
      @if (isExpanded()) {
        <div class="menu-items">
          @for (item of menuItems(); track item.route; let i = $index) {
            <div 
              class="menu-item"
              [style.animation-delay.ms]="i * 50"
              (click)="navigateTo(item.route, $event)"
            >
              <div class="menu-icon">{{ item.icon }}</div>
              <span class="menu-label">{{ item.label }}</span>
            </div>
          }
        </div>
      }

      <!-- Backdrop -->
      @if (isExpanded()) {
        <div 
          class="menu-backdrop" 
          (click)="closeMenu()"
        ></div>
      }
    </div>
  `,
  styleUrls: ['./draggable-menu.component.css']
})
export class DraggableMenuComponent {
  private router = inject(Router);
  
  // ViewChild signal
  menuContainer = viewChild.required<ElementRef>('menuContainer');

  // Signals for reactive state
  isExpanded = signal(false);
  isDragging = signal(false);
  position = signal({ x: 20, y: 100 });
  
  private dragStart = { x: 0, y: 0 };
  private clickThreshold = 5; // pixels
  private dragOccurred = false;
  
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
    this.dragOccurred = false;
    this.dragStart.x = event.clientX - this.position().x;
    this.dragStart.y = event.clientY - this.position().y;
    
    event.preventDefault();
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging()) return;

    const deltaX = Math.abs(event.clientX - (this.dragStart.x + this.position().x));
    const deltaY = Math.abs(event.clientY - (this.dragStart.y + this.position().y));
    
    // Only consider it a drag if moved beyond threshold
    if (deltaX > this.clickThreshold || deltaY > this.clickThreshold) {
      this.dragOccurred = true;
    }

    if (this.dragOccurred) {
      const newX = event.clientX - this.dragStart.x;
      const newY = event.clientY - this.dragStart.y;

      // Keep menu within viewport bounds
      const menuWidth = 60;
      const menuHeight = 60;
      
      const boundedX = Math.max(0, Math.min(window.innerWidth - menuWidth, newX));
      const boundedY = Math.max(0, Math.min(window.innerHeight - menuHeight, newY));
      
      this.position.set({ x: boundedX, y: boundedY });
    }
  }

  onMouseUp(event: MouseEvent) {
    this.isDragging.set(false);
  }

  // Touch event handlers for mobile support
  startTouchDrag(event: TouchEvent) {
    if (this.isExpanded()) return;
    
    const touch = event.touches[0];
    this.isDragging.set(true);
    this.dragOccurred = false;
    this.dragStart.x = touch.clientX - this.position().x;
    this.dragStart.y = touch.clientY - this.position().y;
    
    event.preventDefault();
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isDragging()) return;

    const touch = event.touches[0];
    const deltaX = Math.abs(touch.clientX - (this.dragStart.x + this.position().x));
    const deltaY = Math.abs(touch.clientY - (this.dragStart.y + this.position().y));
    
    // Only consider it a drag if moved beyond threshold
    if (deltaX > this.clickThreshold || deltaY > this.clickThreshold) {
      this.dragOccurred = true;
    }

    if (this.dragOccurred) {
      const newX = touch.clientX - this.dragStart.x;
      const newY = touch.clientY - this.dragStart.y;

      // Keep menu within viewport bounds
      const menuWidth = 60;
      const menuHeight = 60;
      
      const boundedX = Math.max(0, Math.min(window.innerWidth - menuWidth, newX));
      const boundedY = Math.max(0, Math.min(window.innerHeight - menuHeight, newY));
      
      this.position.set({ x: boundedX, y: boundedY });
    }
  }

  onTouchEnd(event: TouchEvent) {
    this.isDragging.set(false);
  }

  toggleMenu(event: MouseEvent) {
    // Don't allow toggle if we just finished dragging
    if (this.dragOccurred) {
      this.dragOccurred = false; // Reset for next interaction
      return;
    }
    
    // Don't toggle if currently dragging
    if (this.isDragging()) {
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