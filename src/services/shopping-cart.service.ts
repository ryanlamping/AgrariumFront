import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Cacao } from 'src/app/interfaces/cacao';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CartItem } from 'src/app/interfaces/cart-item';
import { CartEventServiceService } from './cart-event-service.service';



@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private apiUrl = 'http://localhost:3000/api/shopping-cart';

  // Subject to notify components when the cart is updated
  private cartUpdateSubject = new Subject<CartItem[]>();

  constructor(private http: HttpClient, private cartEventService: CartEventServiceService) { }

  addProductToCart(customer_id: string | null, product_id: number | undefined, quantity: number, price: number | undefined): Observable<any> {
    console.log(customer_id, product_id, quantity, price);

    // Ensure product_id is not undefined
    if (product_id === undefined || product_id === null) {
      console.error('Product ID is not valid.');
      return of({ success: false, message: "Failed to add product to cart. Product ID is null or undefined" });
  }

    const body = {
      customer_id,
      product_id,
      quantity,
      price
    };
    
    console.log(body);
    let result = this.http.post(`${this.apiUrl}/addProductToCart`, body)
    this.cartEventService.emitCartUpdate();
    return result;
  }

 
 // Fetch cart items and notify subscribers
 fetchCartItems(customer_id: string): Observable<any> {
  const apiUrl = `${this.apiUrl}/getCartItems`;
  return this.http.get(`${this.apiUrl}/getCartItems?customer_id=${customer_id}`);
}

// Observable to subscribe to cart updates
get cartUpdates(): Observable<CartItem[]> {
  return this.cartUpdateSubject.asObservable();
}
}
