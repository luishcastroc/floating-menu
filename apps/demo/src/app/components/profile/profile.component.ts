import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="content-card">
        <h1>👤 Profile Page</h1>
        <p>Manage your profile settings and personal information here.</p>
        <div class="profile-section">
          <div class="profile-avatar">👨‍💼</div>
          <div class="profile-info">
            <h2>John Doe</h2>
            <p class="role">Senior Developer</p>
            <p class="email">john.doe&#64;example.com</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .page-container {
        min-height: 100vh;
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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
        text-align: center;
      }

      .profile-section {
        margin-top: 30px;
      }

      .profile-avatar {
        font-size: 4rem;
        margin-bottom: 20px;
      }

      .profile-info h2 {
        color: #333;
        margin-bottom: 10px;
      }

      .role {
        color: #667eea;
        font-weight: 600;
        margin-bottom: 5px;
      }

      .email {
        color: #666;
        font-size: 0.9rem;
      }
    `,
  ],
})
export class ProfileComponent {}
