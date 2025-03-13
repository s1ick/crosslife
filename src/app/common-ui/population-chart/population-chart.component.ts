import { Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { City } from '../../models/city.model';
@Component({
  selector: 'app-population-chart',
  standalone: true,
  template: '<canvas id="populationChart"></canvas>'
})
export class PopulationChartComponent {
  @Input() region1Data: City[] = []; 
  @Input() region2Data: City[] = [];

  private chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  ngOnChanges(): void {
    if (this.chart) {
      this.updateChart();
    }
  }

  private createChart(): void {
    const ctx = document.getElementById('populationChart') as HTMLCanvasElement;
    Chart.register(...registerables);
  
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: this.getChartData(),
      options: {
        responsive: true, // График будет адаптивным
        maintainAspectRatio: false, // Отключаем сохранение пропорций
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Регионы',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Население',
            },
          },
        },
      },
    });
  
    ctx.style.maxHeight = '400px';
  }
  private updateChart(): void {
    this.chart.data = this.getChartData();
    this.chart.update();
  }

  private getChartData(): any {
    const labels = [
      ...this.region1Data.map((city) => city.name),
      ...this.region2Data.map((city) => city.name),
    ];

    const data = [
      ...this.region1Data.map((city) => city.population),
      ...this.region2Data.map((city) => city.population),
    ];

    return {
      labels: labels,
      datasets: [
        {
          label: 'Население',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }
}