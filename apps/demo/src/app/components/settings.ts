import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="content-card">
        <h1>⚙️ Settings Page</h1>
        <p>Configure your application preferences and settings.</p>
        <div class="settings-grid">
          <div class="setting-item">
            <h3>🎨 Theme</h3>
            <p>Choose your preferred color scheme</p>
          </div>
          <div class="setting-item">
            <h3>🔔 Notifications</h3>
            <p>Manage your notification preferences</p>
          </div>
          <div class="setting-item">
            <h3>🔒 Privacy</h3>
            <p>Control your privacy settings</p>
          </div>
          <div class="setting-item">
            <h3>🌐 Language</h3>
            <p>Select your preferred language</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .page-container {
        min-height: 100vh;
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
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
        max-width: 700px;
        width: 100%;
      }

      .settings-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-top: 30px;
      }

      .setting-item {
        padding: 20px;
        border-radius: 15px;
        background: #f8f9fa;
        border-left: 4px solid #4facfe;
        transition: transform 0.2s ease;
      }

      .setting-item:hover {
        transform: translateX(5px);
      }

      .setting-item h3 {
        color: #333;
        margin-bottom: 10px;
      }

      .setting-item p {
        color: #666;
        margin: 0;
        font-size: 0.9rem;
      }
    `,
  ],
})
export class Settings {}
