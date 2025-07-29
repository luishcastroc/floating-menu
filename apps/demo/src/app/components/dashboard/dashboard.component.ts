import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="content-card">
        <h1>📊 Dashboard</h1>
        <p>Your comprehensive overview and analytics dashboard.</p>
        <div class="stats-grid">
          @for (stat of stats; track stat.label) {
          <div class="stat-card">
            <div class="stat-icon">{{ stat.icon }}</div>
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
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
        background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
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

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 20px;
        margin-top: 30px;
      }

      .stat-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 25px;
        border-radius: 15px;
        text-align: center;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease;
      }

      .stat-card:hover {
        transform: translateY(-5px);
      }

      .stat-icon {
        font-size: 2rem;
        margin-bottom: 10px;
      }

      .stat-value {
        font-size: 1.8rem;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .stat-label {
        font-size: 0.9rem;
        opacity: 0.9;
      }
    `,
  ],
})
export class DashboardComponent {
  stats = [
    { icon: '📈', value: '2,847', label: 'Total Views' },
    { icon: '👥', value: '1,234', label: 'Active Users' },
    { icon: '💰', value: '$12,456', label: 'Revenue' },
    { icon: '⭐', value: '4.8', label: 'Rating' },
  ];
}
