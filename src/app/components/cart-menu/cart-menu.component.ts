import { Component } from '@angular/core';

// Creating enum for MyShopChoice to ensure only one value is selected
enum MyShopChoice {
  MyCart = 'My Cart',
  ShippingDetails = 'Shipping Details',
  Payment = 'Payment',
  Confirmation = 'Confirmation',
  OrderManagement = 'Order Management'
}
@Component({
  selector: 'app-cart-menu',
  standalone: true,
  imports: [],
  templateUrl: './cart-menu.component.html',
  styleUrl: './cart-menu.component.scss'
})


export class CartMenuComponent {

}
