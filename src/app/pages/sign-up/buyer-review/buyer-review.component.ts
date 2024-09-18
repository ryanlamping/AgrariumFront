import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    CommonModule, 
    HeaderComponent, 
    MatButtonModule, 
    MatRadioModule, 
    FormsModule, 
    MatButtonToggleModule,
    FooterComponent
  ],
  templateUrl: './buyer-review.component.html',
  styleUrls: ['./buyer-review.component.scss']
})
export class BuyerReviewSubmitComponent {

}
