import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="content-card">
        <h1>🔔 Notifications</h1>
        <p>Stay updated with your latest notifications and alerts.</p>
        <div class="notifications-list">
          @for (notification of notifications; track notification.title) {
          <div class="notification-item" [class]="notification.type">
            <div class="notification-icon">{{ notification.icon }}</div>
            <div class="notification-content">
              <h3>{{ notification.title }}</h3>
              <p>{{ notification.message }}</p>
              <span class="notification-time">{{ notification.time }}</span>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .page-container {
        min-height: 100vh;
        background: linear-gradient(135deg, #fee140 0%, #fa709a 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }

      .content-card {
        background: white;
        border-radius: 20px;
        padding: 40px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        max-width: 600px;
        width: 100%;
      }

      .notifications-list {
        margin-top: 30px;
      }

      .notification-item {
        display: flex;
        padding: 20px;
        border-radius: 12px;
        margin-bottom: 15px;
        border-left: 4px solid #ddd;
        background: #f8f9fa;
        transition: all 0.2s ease;
      }

      .notification-item:hover {
        transform: translateX(5px);
      }

      .notification-item.success {
        border-left-color: #28a745;
      }

      .notification-item.warning {
        border-left-color: #ffc107;
      }

      .notification-item.info {
        border-left-color: #17a2b8;
      }

      .notification-icon {
        font-size: 1.5rem;
        margin-right: 15px;
        margin-top: 5px;
      }

      .notification-content h3 {
        color: #333;
        margin: 0 0 8px 0;
        font-size: 1rem;
      }

      .notification-content p {
        color: #666;
        margin: 0 0 8px 0;
        line-height: 1.4;
      }

      .notification-time {
        color: #999;
        font-size: 0.8rem;
      }
    `,
  ],
})
export class NotificationsComponent {
  notifications = [
    {
      icon: '✅',
      title: 'Task Completed',
      message: 'Your project has been successfully deployed to production.',
      time: '5 minutes ago',
      type: 'success',
    },
    {
      icon: '⚠️',
      title: 'Update Available',
      message: 'A new version of the application is available for download.',
      time: '1 hour ago',
      type: 'warning',
    },
    {
      icon: 'ℹ️',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur tonight from 2-4 AM.',
      time: '3 hours ago',
      type: 'info',
    },
  ];
}
