import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from 'src/services/dashboard.service';

@Component({
  selector: 'app-orders-by-product',
  standalone: true,
  imports: [],
  templateUrl: './orders-by-product.component.html',
  styleUrl: './orders-by-product.component.scss'
})
export class OrdersByProductComponent implements OnInit{
  totalOrders: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getOrdersByProduct().subscribe(
      (data) => {
        this.totalOrders = data;
        console.log("total sales: ", this.totalOrders);
        this.generateChart();
      }, 
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  generateChart() {
    // get products and corresponding total sales
    const labels: string[] = [];
    const data: number[] = [];

    // Extracting data from JSON array
    for (let i = 0; i < this.totalOrders.length; i++) {
      labels.push(this.totalOrders[i].product_id);
      data.push(this.totalOrders[i].total);
    }

    const ctx = document.getElementById('ordersByProduct') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          label: "Orders",
          backgroundColor: [
            'rgba(0, 70, 31, 0.7)',
            'rgba(90, 0, 0, 0.7',
            'rgba(0, 0, 41, 0.7)',
            'rgba(40, 41, 0, 0.7)'
          ],
          borderColor: [
            'rgba(0, 70, 31, 1)',
            'rgba(41, 0, 20, 1',
            'rgba(0, 0, 41, 1)',
            'rgba(40, 41, 0, 1)'
          ],
          borderWidth: 3
        }]
      },
      options: {
        indexAxis: 'y', // Set indexAxis to 'y' for horizontal bar chart
        elements: {
          bar: {
            borderWidth: 2
          }
        },
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: false,
            text: 'Orders by Product',
            color: 'dark green'
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Total Orders',
              color: 'dark green',
              font: {
                size: 20
              }
            },
            grid : {
              display: false
            },
            ticks: {
              color: 'dark green',
              stepSize: 1,
              font: {
                size: 18
              }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Product',
              color: 'dark green',
              font: {
                size: 20
              }
            },
            grid : {
              display: false
            },
            ticks: {
              color: 'dark green',
              font: {
                size: 18
              }
            }
          }
        }
      }
    });
}
}
