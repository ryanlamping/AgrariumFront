import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { DashboardService } from 'src/services/dashboard.service';
import { UserService } from 'src/services/user.service';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { OrdersByLocationComponent } from 'src/app/dashboard charts/orders-by-location/orders-by-location.component';
import { OrdersByProductComponent } from 'src/app/dashboard charts/orders-by-product/orders-by-product.component';
import { SalesByLocationComponent } from 'src/app/dashboard charts/sales-by-location/sales-by-location.component';
import { SalesByProductComponent } from 'src/app/dashboard charts/sales-by-product/sales-by-product.component';
import { TotalOrdersComponent } from 'src/app/dashboard charts/total-orders/total-orders.component';
import { TotalSalesComponent } from 'src/app/dashboard charts/total-sales/total-sales.component';
import { TotalOrdersSupComponent } from 'src/app/dashboard charts/total-orders-sup/total-orders-sup.component';
import { TotalSalesSupComponent } from 'src/app/dashboard charts/total-sales-sup/total-sales-sup.component';

@Component({
  selector: 'app-admin-dash',
  standalone: true,
  imports: [HeaderComponent, OrdersByLocationComponent, OrdersByProductComponent, SalesByLocationComponent, SalesByProductComponent, TotalSalesComponent, 
  TotalOrdersComponent, TotalOrdersSupComponent, TotalOrdersSupComponent, TotalSalesSupComponent],
  templateUrl: './admin-dash.component.html',
  styleUrl: './admin-dash.component.scss'
})
export class AdminDashComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    console.log(token);
    if (token) {
      // check permissions of user role
      if(this.authService.getToken() != 'a') { 
        // reroute to no access page
      }
    }
    else {
      console.log("token not valid");
      this.router.navigate(['/log-in']);
    }
  }

}
