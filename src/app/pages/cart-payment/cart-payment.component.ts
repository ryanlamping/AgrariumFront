import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CartMenuComponent } from 'src/app/components/cart-menu/cart-menu.component';
import { NgxStripeModule, StripeCardComponent, StripeFactoryService, StripeInstance, StripeService } from "ngx-stripe";
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { PaymentService } from 'src/services/stripe.service';
import { loadStripe } from '@stripe/stripe-js';
import { CartItem } from 'src/app/interfaces/cart-item';
import { AuthService } from 'src/services/auth.service';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { userShipping } from 'src/app/interfaces/shipping';
import { UserService } from 'src/services/user.service';
import { shippingInfo } from 'src/app/interfaces/shipping-info';

@Component({
  selector: 'app-cart-payment',
  standalone: true,
  imports: [
    HeaderComponent,
    CartMenuComponent,
    CommonModule,
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    MatButtonToggleModule,
    StripeCardComponent,
    MatFormFieldModule,
    NgxStripeModule
  ],
  templateUrl: './cart-payment.component.html',
  styleUrl: './cart-payment.component.scss'
})
export class CartPaymentComponent implements OnInit {
  @Input() cartItems: CartItem[] = [];
  address: userShipping[] = [];
  firstName!: string;
  lastName!: string;
  addressDetails!: string;
  countryName!: string;
  provinceName!: string;
  customerId!: string;
  phoneNo!: string;
  zipCode!: string;
  direction: shippingInfo | undefined;

  public stripe!: StripeInstance;
  public stripeAmount!: number;
  public stripePublicKey = 'publickey';


  constructor(private router: Router, 
              private stripeService: StripeService,
              private http: HttpClient, 
              private stripeFactory: StripeFactoryService,
              private paymentService: PaymentService,
              private authService: AuthService,
              private cartService: ShoppingCartService,
              private userService: UserService){
            }

  ngOnInit(): void {
    this.stripe = this.stripeFactory.create(this.stripePublicKey);
    const customer_id = this.authService.getUserId()

    this.cartService.fetchCartItems(customer_id).subscribe(
      (cartItems: CartItem[]) => {
        this.cartItems = cartItems;
        console.log(this.cartItems);
        this.stripeAmount = 100 * this.calculateTotal();
        console.log(this.stripeAmount);
        this.userService.getDefaultAddress(this.authService.getUserId()).subscribe(
          (data: userShipping[]) => {
            this.address = data;
            this.firstName = this.address[0]?.first_name;
            this.lastName = this.address[0]?.last_name;
            this.addressDetails = this.address[0]?.address_details;
            this.countryName = this.address[0]?.country_name;
            this.provinceName = this.address[0]?.province_name;
            this.customerId = this.address[0]?.customer_id;
            this.phoneNo = this.address[0]?.phone_no;
            this.zipCode = this.address[0]?.zip_code;

            this.direction = {
              line1: this.addressDetails,
              city: this.provinceName,
              country: this.countryName,
              postal_code: this.zipCode
            }

            this.http.post('http://localhost:3000/api/stripe/create-checkout-session', {
          items: JSON.stringify(this.cartItems),
          amount: this.stripeAmount,
          address: this.direction,
          customer_id: this.customerId
          }
          ).subscribe(async(res: any) => {
            let stripe = await loadStripe('pk_test_51Owynd06kHJ5I0LvwyK8evzz179s3kKqxq8XVQwVS1pDuWN32uQP4Cs5luHcyuD2H8jYykDVzopMfHOkJcoex72D007A9cSbVD');
            stripe?.redirectToCheckout({
              sessionId: res.id
            })
          })
      },
      (error: any) => {
        console.error('Error fetching cart items:', error);
      }
    );
      },
      (error: any)  => {
        console.log("error fetching address: ", error)
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
}
