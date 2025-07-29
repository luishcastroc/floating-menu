import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="content-card">
        <h1>💬 Messages</h1>
        <p>View and manage your messages and conversations.</p>
        <div class="messages-list">
          <div class="message-item" *ngFor="let message of messages">
            <div class="message-avatar">{{ message.avatar }}</div>
            <div class="message-content">
              <div class="message-header">
                <span class="sender">{{ message.sender }}</span>
                <span class="time">{{ message.time }}</span>
              </div>
              <p class="message-text">{{ message.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .page-container {
        min-height: 100vh;
        background: linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%);
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

      .messages-list {
        margin-top: 30px;
      }

      .message-item {
        display: flex;
        padding: 15px;
        border-radius: 10px;
        margin-bottom: 15px;
        background: #f8f9fa;
        transition: background 0.2s ease;
      }

      .message-item:hover {
        background: #e9ecef;
      }

      .message-avatar {
        font-size: 2rem;
        margin-right: 15px;
      }

      .message-content {
        flex: 1;
      }

      .message-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
      }

      .sender {
        font-weight: 600;
        color: #333;
      }

      .time {
        color: #666;
        font-size: 0.8rem;
      }

      .message-text {
        color: #666;
        margin: 0;
        line-height: 1.4;
      }
    `,
  ],
})
export class Messages {
  messages = [
    {
      avatar: '👨‍💼',
      sender: 'John Smith',
      time: '2 min ago',
      text: 'Hey, could you review the latest project updates?',
    },
    {
      avatar: '👩‍💻',
      sender: 'Sarah Johnson',
      time: '15 min ago',
      text: 'The new feature is ready for testing!',
    },
    {
      avatar: '👨‍🎨',
      sender: 'Mike Wilson',
      time: '1 hour ago',
      text: "I've updated the design mockups as requested.",
    },
  ];
}
