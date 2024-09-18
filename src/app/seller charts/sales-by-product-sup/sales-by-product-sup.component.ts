import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from 'src/services/auth.service';
import { DashboardService } from 'src/services/dashboard.service';

@Component({
  selector: 'app-sales-by-product-sup',
  standalone: true,
  imports: [],
  templateUrl: './sales-by-product-sup.component.html',
  styleUrl: './sales-by-product-sup.component.scss'
})
export class SalesByProductSupComponent {
  totalOrders: any[] = [];

  constructor(private dashboardService: DashboardService, private authService: AuthService) {}

  ngOnInit(): void {
    const user_id = this.authService.getUserId()
    this.dashboardService.getSalesByProductSup(user_id).subscribe(
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

  generateChart(){
    // get months and corresponding values
    const labels: string[] = [];
    const data: number[]= [];

    // Extracting data from json array

    for(let i=0; i<this.totalOrders.length; i++) {
      labels.push(this.totalOrders[i].product_id);
      data.push(this.totalOrders[i].total);
    }
    console.log(labels);
    console.log(data);

    const ctx = document.getElementById('salesProduct') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: "Total Sales",
          data: data,
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
              text: 'Total Price',
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
              text: 'Product',
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
            }
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          
        }
      }
    });
  }
}
