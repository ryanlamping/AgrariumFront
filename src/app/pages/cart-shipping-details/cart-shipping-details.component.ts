import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule} from '@angular/material/button-toggle';


import { HeaderComponent } from 'src/app/components/header/header.component';
import { CartMenuComponent } from 'src/app/components/cart-menu/cart-menu.component';
import { AuthService } from 'src/services/auth.service';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { UserService } from 'src/services/user.service';
import { userShipping } from 'src/app/interfaces/shipping';

@Component({
  selector: 'app-cart-shipping-details',
  standalone: true,
  imports: [
    HeaderComponent,
    CartMenuComponent,
    CommonModule,
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    MatButtonToggleModule
  ],
  templateUrl: './cart-shipping-details.component.html',
  styleUrl: './cart-shipping-details.component.scss'
})
export class CartShippingDetailsComponent implements OnInit {

  address: userShipping[] = [];
  firstName: string | undefined;
  lastName: string | undefined;
  addressDetails: string | undefined;
  countryName: string | undefined;
  provinceName: string | undefined;
  customerId: string | undefined;
  phoneNo: string | undefined;
  zipCode: string | undefined;



  constructor(private userService: UserService, private authService: AuthService, private cartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.userService.getDefaultAddress(this.authService.getUserId()).subscribe(
      (data: userShipping[]) => {
        this.address = data;
        console.log(this.address)
        console.log(this.address[0].first_name);
        this.firstName = this.address[0]?.first_name;
        this.lastName = this.address[0]?.last_name;
        this.addressDetails = this.address[0]?.address_details;
        this.countryName = this.address[0]?.country_name;
        this.provinceName = this.address[0]?.province_name;
        this.customerId = this.address[0]?.customer_id;
        this.phoneNo = this.address[0]?.phone_no;
        this.zipCode = this.address[0]?.zip_code;
      },
      (error: any)  => {
        console.log("error fetching address: ", error)
      }
    );
  }
}
