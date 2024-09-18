import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/user'
  constructor(private http: HttpClient) { }

  getOrders(user_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders?user_id=${user_id}`);
  }

  getFavorites(user_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/favorites?user_id=${user_id}`);
  }
  getDefaultAddress(user_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/address?user_id=${user_id}`);
  }
}
