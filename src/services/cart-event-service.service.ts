import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartEventServiceService {
  private cartUpdateSubject = new Subject<void>();

  // Observable to subscribe to cart update events
  cartUpdate$ = this.cartUpdateSubject.asObservable();

  // Method to emit cart update events
  emitCartUpdate(): void {
    this.cartUpdateSubject.next();
  }
}
