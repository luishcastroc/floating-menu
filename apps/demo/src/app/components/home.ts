import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="content-card">
        <h1>🏠 Home Page</h1>
        <p>
          Welcome to the Home page! This is a placeholder page accessible
          through the draggable menu.
        </p>
        <div class="feature-grid">
          <div class="feature-item">
            <span class="feature-icon">🎯</span>
            <h3>Dashboard</h3>
            <p>Quick access to your main dashboard</p>
          </div>
          <div class="feature-item">
            <span class="feature-icon">📈</span>
            <h3>Analytics</h3>
            <p>View your performance metrics</p>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🔧</span>
            <h3>Tools</h3>
            <p>Access your favorite tools</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .page-container {
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
        max-width: 800px;
        width: 100%;
      }

      h1 {
        color: #333;
        margin-bottom: 20px;
        font-size: 2.5rem;
        text-align: center;
      }

      p {
        color: #666;
        line-height: 1.6;
        margin-bottom: 30px;
        text-align: center;
      }

      .feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-top: 30px;
      }

      .feature-item {
        text-align: center;
        padding: 20px;
        border-radius: 15px;
        background: #f8f9fa;
        transition: transform 0.2s ease;
      }

      .feature-item:hover {
        transform: translateY(-5px);
      }

      .feature-icon {
        font-size: 2rem;
        display: block;
        margin-bottom: 10px;
      }

      .feature-item h3 {
        color: #333;
        margin-bottom: 10px;
      }

      .feature-item p {
        color: #666;
        font-size: 0.9rem;
        margin: 0;
      }
    `,
  ],
})
export class Home {}
