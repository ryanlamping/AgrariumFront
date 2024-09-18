import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { OrdersByProductSupComponent } from '../seller charts/orders-by-product-sup/orders-by-product-sup.component';
import { SalesByProductSupComponent } from '../seller charts/sales-by-product-sup/sales-by-product-sup.component';
import { TotalOrdersSupplierComponent } from '../seller charts/total-orders-supplier/total-orders-supplier.component';
import { TotalSalesSupplierComponent } from '../seller charts/total-sales-supplier/total-sales-supplier.component';

@Component({
  selector: 'app-seller-dash',
  standalone: true,
  imports: [ OrdersByProductSupComponent, SalesByProductSupComponent, TotalOrdersSupplierComponent, TotalSalesSupplierComponent],
  templateUrl: './seller-dash.component.html',
  styleUrl: './seller-dash.component.scss'
})

export class SellerDashComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    console.log(token);
    if (token) {
      // check permissions of user role
      if(this.authService.getToken() != 's') {
        // reroute to no access page
      }
    }
    else {
      console.log("token not valid");
      this.router.navigate(['/log-in']);
    }
  }
}
