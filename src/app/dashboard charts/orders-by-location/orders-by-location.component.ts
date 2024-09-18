import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from 'src/services/dashboard.service';

@Component({
  selector: 'app-orders-by-location',
  standalone: true,
  imports: [],
  templateUrl: './orders-by-location.component.html',
  styleUrl: './orders-by-location.component.scss'
})

export class OrdersByLocationComponent implements OnInit{
  totalOrders: any[] = [];
  countries: string[] = [];
  totalSales: number[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getOrdersByLocation().subscribe(
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
  
  aggregateSalesData(data: any[]): { [key: string]: number } {
    return data.reduce((acc, curr) => {
      if (acc[curr.country]) {
        acc[curr.country] += curr.total_sales;
      } else {
        acc[curr.country] = curr.total_sales;
      }
      return acc;
    }, {});
  }

  fetchSalesData() {
    this.dashboardService.getOrdersByLocation().subscribe(data => {
      const aggregatedData = this.aggregateSalesData(data);
      this.countries = Object.keys(aggregatedData);
      this.totalSales = Object.values(aggregatedData);
      this.generateChart();
    });
  }

  generateChart() {
    const aggregatedData = this.aggregateSalesData(this.totalOrders);
    const countries = Object.keys(aggregatedData);
    const totalSales = Object.values(aggregatedData);

    const ctx = document.getElementById('ordersByLocation') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: countries,
        datasets: [{
          label: 'Orders',
          data: totalSales,
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
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Total Orders',
              color: 'dark green',
              font: {
                size: 20
              }
            },
            grid: {
              display: false
            },
            ticks: {
              color: 'dark green',
              font: {
                size: 18
              },
              stepSize: 1
            }
          },
          x: {
            title: {
              display: true,
              text: 'Country',
              color: 'dark green',
              font: {
                size: 20
              }
            },            
            grid: {
              display: false
            },
            ticks: {
              color: 'dark green',
              font: {
                size: 18
              }
            }

          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
}


}
