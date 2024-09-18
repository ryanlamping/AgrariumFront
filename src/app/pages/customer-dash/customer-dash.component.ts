import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { AuthService } from 'src/services/auth.service';
import { ProductService } from 'src/services/product.service';
import { UserService } from 'src/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TokenService } from 'src/services/token.service';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { NotificationService } from 'src/services/notification.service';
import { DashboardProduct } from 'src/app/interfaces/dashboard-product';
import { DashboardFavorites } from 'src/app/interfaces/dashboard-favorites';
import { CartMenuComponent } from 'src/app/components/cart-menu/cart-menu.component';
import { CartEventServiceService } from 'src/services/cart-event-service.service';


@Component({
    selector: 'app-customer-dash',
    standalone: true,
    templateUrl: './customer-dash.component.html',
    styleUrl: './customer-dash.component.scss',
    imports: [CommonModule, HeaderComponent, CarouselModule, MatIconModule, CartMenuComponent]
})
export class CustomerDashComponent implements OnInit {
  helper = new JwtHelperService();
  orders: DashboardProduct[] = [];
  favorites: DashboardFavorites[] = [];

  constructor(private shoppingCart: ShoppingCartService, private notificationService: NotificationService, private tokenService: TokenService, private authService: AuthService, private productService: ProductService, private userService: UserService, private router: Router, private cartService: CartEventServiceService) {}
  
  ngOnInit(): void {
    const token = this.authService.getToken();
    console.log(token);
    if (token) {
      const decoded = this.helper.decodeToken(token);
      const userId = decoded.user_id;
      console.log("userId: ", userId);
      this.userService.getOrders(userId).subscribe(
        (data) => {
          console.log('data: ', data);
          this.orders = data;
          console.log('orders: ', this.orders);
        },
        (error) => {
          console.log("Error: ", error);
        }
      );
      this.userService.getFavorites(userId).subscribe(
        (data) => {
          console.log('data: ', data);
          this.favorites = data;
          console.log('favorites: ', this.favorites);
        }
      )
      this.authService.refreshToken(token)
    }
    else {
      console.log("token not valid");
      this.router.navigate(['/log-in']);
    }

  }
  
  addToCart(product: DashboardProduct, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    console.log("adding to cart");
    
    // Check if product_id is valid
    if (product.product_id === undefined || product.product_id === null) {
        console.error('Product ID is not valid.');
        return; // or handle the error in another way
    }

    const customer_id = this.authService.getUserId();

    this.shoppingCart.addProductToCart(customer_id, product.product_id, 3, parseFloat(product.price)).subscribe(
      (response: any) => {
        this.notificationService.showNotification("Product added to cart!");
        this.cartService.emitCartUpdate();
        console.log('Product added to cart:', response);
      },
      (error: any) => {
        // Handle errors
        this.notificationService.showNotification("Failed to add to cart!");
        console.error('Error adding product to cart:', error);
      }
    );
}

addToCartF(product: DashboardFavorites, event: MouseEvent): void {
  event.preventDefault();
  event.stopPropagation();

  console.log("adding to cart");
  
  // Check if product_id is valid
  if (product.product_id === undefined || product.product_id === null) {
      console.error('Product ID is not valid.');
      return; // or handle the error in another way
  }

  const customer_id = this.authService.getUserId();
  console.log("product_id", product.product_id);


  this.shoppingCart.addProductToCart(customer_id, product.product_id, product.product_id, product.product_id).subscribe(
    (response: any) => {
      this.notificationService.showNotification("Product added to cart!");
      this.cartService.emitCartUpdate();
      // Handle the response as needed
      console.log('Product added to cart:', response);
    },
    (error: any) => {
      // Handle errors
      this.notificationService.showNotification("Failed to add to cart!");
      console.error('Error adding product to cart:', error);
    }
  );
}
  selectProduct(productId: number): void {
    this.router.navigate(['/product', productId]);

  }

  // on init 
  //    get customer_id
  //    get data associated with said customer
  //        recent orders
  //        favorite products
  //        personal information
  //        deals and sales
  //        analytics
}
