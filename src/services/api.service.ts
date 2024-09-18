import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api'; // api endpoint of our backend (node.js server)

  constructor(private http: HttpClient) {}  // makes HTTP requests to the backend

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/data`);
  }

  getTypeRequest(url: any): Observable<any> {
    return this.http.get(`${this.apiUrl}${url}`).pipe(map((res: any) => {
      return res;
    }));
  }

  postTypeRequest(url: string, payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${url}`, payload).pipe(map((res: any) => {
      return res;
    }));
  }

  putTypeRequest(url: any, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${url}`, payload).pipe(map((res: any) => {
      return res;
    }));
  }
}
