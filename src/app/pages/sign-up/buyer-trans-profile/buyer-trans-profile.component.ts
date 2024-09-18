import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from 'src/services/user-data.service';
import { NotificationService } from 'src/services/notification.service';
import { AuthService } from 'src/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

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
    FooterComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './buyer-trans-profile.component.html',
  styleUrls: ['./buyer-trans-profile.component.scss'],
})
export class BuyerTransactionProfileComponent implements OnInit {
  transForm!: FormGroup;
  buyerUserId: string | undefined; // Declare the property here

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private userDataService: UserDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeTransProfileForm();

    this.route.queryParams.subscribe((params) => {
      this.buyerUserId = params['userId'];
    });
  }

  initializeTransProfileForm() {
    this.transForm = this.formBuilder.group({
      name_on_account: ['', Validators.required],
      account_number: ['', Validators.required],
      routing_number: ['', Validators.required],
    });
  }
  

  onSubmit() {
    console.log(this.transForm.value);

    if (this.buyerUserId) {
      this._auth
        .saveCustomerTransProfile({
          customer_id: this.buyerUserId,
          name_on_account: this.transForm.value.name_on_account,
          account_number: this.transForm.value.account_number,
          routing_number: this.transForm.value.routing_number,
        })
        .subscribe(
          (res) => {
            this._router.navigate(['/buyer-review']);
            console.log(res);
          },
          (error) => {
            console.error(error);
          }
        );
    } else {
      console.error(
        'Seller user ID is undefined. Unable to make the API call.'
      );
      // Handle the case where sellerUserId is undefined
    }
  }
}
