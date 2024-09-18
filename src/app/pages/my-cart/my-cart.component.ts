import { Component , OnInit} from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { CartPaymentComponent } from '../cart-payment/cart-payment.component';


import { HeaderComponent } from 'src/app/components/header/header.component';
import { CartMenuComponent } from 'src/app/components/cart-menu/cart-menu.component';
import { CartItem } from 'src/app/interfaces/cart-item';
import { ShoppingCartService } from 'src/services/shopping-cart.service';

import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-cart',
  standalone: true,
  imports: [
    HeaderComponent,
    CartMenuComponent,
    CommonModule,
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    MatButtonToggleModule,
  ],
  templateUrl: './my-cart.component.html',
  styleUrl: './my-cart.component.scss'
})
export class MyCartComponent implements OnInit{
  //item: CartItem[] = [];
  cartItems: CartItem[] = [];


  constructor(private router: Router, private httpClient: HttpClient, private authService: AuthService, private cartService: ShoppingCartService) {}

  ngOnInit() {
    // Subscribe to cart updates from the service
    const customer_id = this.authService.getUserId()
    this.cartService.fetchCartItems(customer_id).subscribe(
      (cartItems: CartItem[]) => {
        console.log(cartItems); // Log the received data
        this.cartItems = cartItems;
        console.log(this.cartItems);
      },
      (error: any) => {
        console.error('Error fetching cart items:', error);
        // Handle the error as needed (e.g., show a message to the user)
      }
    );
  }

  calculateTotal(): number {
    let total = 0;

    if (this.cartItems && this.cartItems.length > 0) {
      total = this.cartItems.reduce((sum: number, item: any) => sum + (item.quantity * item.price), 0);
    }

    return total;
  }

  continueToPayment() {
    this.router.navigate(['/payment']); // Navigate to the 'cart-shipping-details' route
  }
}
