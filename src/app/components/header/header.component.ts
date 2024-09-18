import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { CartItem } from 'src/app/interfaces/cart-item';
import { Observable } from 'rxjs';
import { CartEventServiceService } from 'src/services/cart-event-service.service';
import { AuthService } from 'src/services/auth.service';

/**
 * @component Home
 * @description Represents the home component of the application.
 * @selector app-footer
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule , MatIconModule, MatButtonModule, MatBadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

/**
 * header component class
 */
export class HeaderComponent {

  notificationCount: number = 0;
  cartItems: CartItem[] = [];

  constructor(
    private router: Router, 
    private cartService: ShoppingCartService, private cartEventService: CartEventServiceService, private authService: AuthService) {}

  /**
   * home function to revert user back to home screen
   */
  home() {
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.cartEventService.cartUpdate$.subscribe(() => {
      this.updateNotificationCount();
    });
    this.updateNotificationCount();
  }

  delay(): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000); // 500 milliseconds = half second
    });
  }

  updateNotificationCount(): void {
    // Get the customer_id from wherever it's available in your application
    const customer_id = this.authService.getUserId()
    console.log("customer_id: ", customer_id);
    this.delay();
    this.cartService.fetchCartItems(customer_id).subscribe(
      (data) => {
        this.cartItems = data;
        console.log("cart items: ", this.cartItems);
        let counter = this.cartItems.length;
        console.log("counter after set: ", counter);
        this.notificationCount = counter;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}