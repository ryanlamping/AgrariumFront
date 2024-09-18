import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cacao } from '../interfaces/cacao';
import { Chart } from 'chart.js';
import { ChartComponent } from '../chart/chart.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { HeaderComponent } from '../components/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { FormsModule } from '@angular/forms';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { NotificationService } from 'src/services/notification.service';
import { AuthService } from 'src/services/auth.service';
import { CartEventServiceService } from 'src/services/cart-event-service.service';
import { ReviewSubmitComponent } from '../pages/sign-up/review/review.component';
import { Review } from '../interfaces/reviews';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ 
    ChartComponent, 
    MatButtonModule, 
    MatRadioModule, 
    MatButtonToggleModule, 
    HeaderComponent,
    FormsModule,
    CommonModule
    ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  @Input() productChoice: Cacao | undefined;

  product_id: number | undefined;
  harvest_date: Date | undefined;
  price: number | undefined;

  quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]; // update with real stock limit
  quantity: number = 1;

  reviews: Review[] = [];

  constructor(private authService: AuthService, private notificationService: NotificationService, private route: ActivatedRoute, private productService: ProductService, private shoppingCart: ShoppingCartService, private cartService: CartEventServiceService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const productId=params.get('id');
      console.log(productId);
      if(productId) {
        this.productService.getProductById(productId).subscribe(
          product => {
            this.productChoice = product[0];
            this.harvest_date = this.productChoice?.harvest_date;
            console.log("product choice", this.productChoice);
            this.product_id = this.productChoice?.product_id;
            this.price = this.productChoice?.price;
            console.log("product id", this.product_id);
            console.log("price", this.price);

            this.productService.getRatings(this.product_id).subscribe(
              (data) => {
                this.reviews = data;
                console.log("reviews: ", this.reviews);
              },
              (error) => {
                console.log("error");
              }
            );


          },
          error => {
            console.error('Error fetching product details:', error);
          }
        );
    }
  });
  }
  addToCart(): void {
    console.log("adding to cart");
    
    // Check if product_id is valid
    if (this.product_id === undefined || this.product_id === null) {
        console.error('Product ID is not valid.');
        return; // or handle the error in another way
    }

    const customer_id = this.authService.getUserId();
    console.log("quantity", this.quantity);
    console.log("product_id", this.product_id);


    this.shoppingCart.addProductToCart(customer_id, this.product_id, this.quantity, this.price).subscribe(
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


  buyNow(): void {
    console.log("buy now");
    // cart service call to add to cart
    // reroute to myshop confirm details
  }
  addToFavorites(): void {
    console.log('added to favorites');
  }
}
