import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from 'src/services/dashboard.service';

@Component({
  selector: 'app-total-orders-sup',
  standalone: true,
  imports: [],
  templateUrl: './total-orders-sup.component.html',
  styleUrl: './total-orders-sup.component.scss'
})
export class TotalOrdersSupComponent implements OnInit{
  totalOrders: any[] = [];
  suppliers: string[] = [];
  totalSales: number[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getOrdersBySupplier().subscribe(
      (data) => {
        this.totalOrders = data;
        console.log("Total sales: ", this.totalOrders);
        this.generateChart();
      }, 
      (error) => {
        console.log("Error: ", error);
      }
    );
  }
  
  aggregateSalesData(data: any[]): { [key: string]: number } {
    return data.reduce((acc, curr) => {
      if (acc[curr.supplier_id]) {
        acc[curr.supplier_id] += curr.total_sales;
      } else {
        acc[curr.supplier_id] = curr.total_sales;
      }
      return acc;
    }, {});
  }

  fetchSalesData() {
    this.dashboardService.getOrdersBySupplier().subscribe(
      (data) => {
      const aggregatedData = this.aggregateSalesData(data);
      this.suppliers = Object.keys(aggregatedData);
      this.totalSales = Object.values(aggregatedData);
      this.generateChart();
    });
  }

  generateChart() {
    const aggregatedData = this.aggregateSalesData(this.totalOrders);
    const countries = Object.keys(aggregatedData);
    const totalSales = Object.values(aggregatedData);

    const ctx = document.getElementById('ordersBySup') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: countries,
        datasets: [{
          label: 'Total Sales',
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
              text: 'Total Sales',
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
              text: 'Supplier',
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