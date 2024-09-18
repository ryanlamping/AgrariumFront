import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule} from '@angular/material/button-toggle';


import { HeaderComponent } from 'src/app/components/header/header.component';
import { CartMenuComponent } from 'src/app/components/cart-menu/cart-menu.component';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

import { CustomerDashComponent } from '../customer-dash/customer-dash.component';
import { AdminDashComponent } from '../admin-dash/admin-dash.component';
import { SellerDashComponent } from 'src/app/seller-dash/seller-dash.component';


enum Types {
  customer = 'c',
  supplier = 's',
  admin = 'a'
}


@Component({
  selector: 'app-my-shop',
  standalone: true,
  imports: [
    HeaderComponent,
    CartMenuComponent,
    CommonModule,
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    MatButtonToggleModule,
    AdminDashComponent,
    CustomerDashComponent,
    SellerDashComponent
  ],
  templateUrl: './my-shop.component.html',
  styleUrl: './my-shop.component.scss'
})

export class MyShopComponent implements OnInit {
  //menu: Boolean = true;
  role: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    console.log("token: ", token);
    console.log("user role: ", this.authService.getUserRole(token));

    if(token) {
      console.log("token is valid");
      this.role = this.authService.getUserRole(token);
      console.log("role: ", this.role);
      if(this.role === 'a') {
        this.role = Types.admin;
        console.log("admin role");
        // this.router.navigate(['/admin-dash']);
      }
      if(this.role === 'c') {
        this.role = Types.customer;
        console.log("user is a customer");
        // this.router.navigate(['/customer-dash']);
      }
      else if(this.role === 's') {
        this.role = Types.supplier;
        console.log("user is a seller");
      }
    }
    else {
      this.router.navigate(['/login']);
    }
  }


}


 
