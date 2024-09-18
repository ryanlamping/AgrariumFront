import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PaymentService {
  private apiUrl = 'http://localhost:3000/api/stripe'
  constructor(private http: HttpClient) { }

  createCheckoutSession(amount: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-checkout-session`, { amount }, { observe: 'response' })
  }

}
