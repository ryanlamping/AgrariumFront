import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from 'src/services/auth.service';
import { DashboardService } from 'src/services/dashboard.service';

@Component({
  selector: 'app-total-sales-supplier',
  standalone: true,
  imports: [],
  templateUrl: './total-sales-supplier.component.html',
  styleUrl: './total-sales-supplier.component.scss'
})
export class TotalSalesSupplierComponent {
  totalSales: any[] = [];

  constructor(private dashboardService: DashboardService, private authService: AuthService) {}

  ngOnInit(): void {
    const user_id = this.authService.getUserId();
    this.dashboardService.getTotalSalesSup(user_id).subscribe(
      (data) => {
        this.totalSales = data;
        console.log("total sales: ", this.totalSales);
        this.generateChart();
      }, 
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  generateChart(){
    // get months and corresponding values
    const labels: string[] = [];
    const data: number[]= [];

    // Extracting data from json array

    for(let i=0; i<this.totalSales.length; i++) {
      labels.push(this.totalSales[i].month);
      data.push(this.totalSales[i].total);
    }
    console.log(labels);
    console.log(data);

    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: "Total Sales",
          data: data,
          backgroundColor: 'rgba(0, 50, 31, 0.2)',
          borderColor: 'rgba(0, 50, 32, 1)',
          borderWidth: 5,
          pointBackgroundColor: 'rgba(0, 50, 31, 0.8)'
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
              stepSize: 1000
            }
          },
          x: {
            title: {
              display: true,
              text: 'Month',
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
