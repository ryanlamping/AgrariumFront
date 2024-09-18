import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule} from '@angular/material/button-toggle';


import { HeaderComponent } from 'src/app/components/header/header.component';
import { CartMenuComponent } from 'src/app/components/cart-menu/cart-menu.component';

@Component({
  selector: 'app-cart-order-management',
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
  
  templateUrl: './cart-order-management.component.html',
  styleUrl: './cart-order-management.component.scss'
})
export class CartOrderManagementComponent {

}
