import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cacao } from '../interfaces/cacao';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  @Input() product: Cacao | undefined;
  constructor() { }

  ngOnInit(): void {
    this.generateChart();
  }

  createLinearGradient(color1: string, color2: string): CanvasGradient {
    const ctx = document.createElement('canvas').getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(50, 100, 100, 300); // Adjust as needed
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);
      return gradient;
    } else {
      throw new Error('Unable to create canvas context');
    }
  }

  generateChart(){
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Bitter', 'Fruity', 'Citric', 'Smoky'],
        datasets: [{
          data: [this.product?.mongodbData.organolepticEvaluation.bitterness.national, this.product?.mongodbData.organolepticEvaluation.astringency.national,
            this.product?.mongodbData.organolepticEvaluation.dryFruit.national, this.product?.mongodbData.organolepticEvaluation.dryFruit.national],
          backgroundColor: [
            this.createLinearGradient('#ffde59', '#ff914d'),
          ],
          borderColor: [
            this.createLinearGradient('#ffde59', '#ff914d'),
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 5,
            grid: {
              display: false
            },
            ticks: {
              color: '#FFF6E0',  // must be capital
              stepSize: 1,
              font: {
                size: 18
              }
            }
          },
          x: {
            grid: {
              display: false 
            },
            ticks: {
              color: '#FFF6E0',
              font: {
                size: 18
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: this.product?.business_name + " Organoleptic Evaluation",
            font: {
              size: 22
            },
            color: '#FFF6E0', // Change color of chart title to a hexadecimal value
          },
          legend: {
            display: false
          },
        },
        elements: {
          bar: {
            borderRadius: 15
          }
        }
      }
    });
  }
}
