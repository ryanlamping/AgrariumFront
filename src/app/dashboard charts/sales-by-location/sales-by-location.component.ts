import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from 'src/services/dashboard.service';

@Component({
  selector: 'app-sales-by-location',
  standalone: true,
  imports: [],
  templateUrl: './sales-by-location.component.html',
  styleUrl: './sales-by-location.component.scss'
})
export class SalesByLocationComponent implements OnInit{
  totalOrders: any[] = [];
  countries: string[] = [];
  totalSales: number[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getSalesByLocation().subscribe(
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
    this.dashboardService.getSalesByLocation().subscribe(
      (data) => {
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

    const ctx = document.getElementById('salesByLocation') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'pie',
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
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false, // Disable aspect ratio
        responsive: true,
      },
    });
  }
}