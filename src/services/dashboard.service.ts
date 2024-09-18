import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getTotalSales(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/totalSales`);
  }

  getTotalSalesSup(sup_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/totalSalesSup?sup_id=${sup_id}`);
  }

  getTotalOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/totalOrders`);
  }

  getTotalOrdersSup(sup_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/totalOrdersSup?sup_id=${sup_id}`);
  }

  getSalesByProduct(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/salesByProduct`);
  }

  getSalesByProductSup(sup_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/salesByProductSup?sup_id=${sup_id}`);
  }

  getSalesByLocation(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/salesByLocation`);
  }

  getOrdersByProduct(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/ordersByProduct`);
  }

  getOrdersByProductSup(sup_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/ordersByProductSup?sup_id=${sup_id}`);
  }

  getOrdersByLocation(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/ordersByLocation`);
  }

  getSalesBySupplier(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/salesBySupplier`);
  }

  getOrdersBySupplier(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/ordersBySupplier`);
  }
  
}
