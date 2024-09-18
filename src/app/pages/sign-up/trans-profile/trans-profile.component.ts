import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/services/notification.service';
import { UserDataService } from 'src/services/user-data.service';

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
    ReactiveFormsModule
  ],
  templateUrl: './trans-profile.component.html',
  styleUrls: ['./trans-profile.component.scss']
})
export class TransactionProfileComponent implements OnInit {

  transForm!: FormGroup;
  sellerUserId: string | undefined; 
  business_name: string | undefined;

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

    this.route.queryParams.subscribe(params => {
      this.sellerUserId = params['userId'];
      this.business_name = params['name'];
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

    if (this.sellerUserId) {
      this._auth.saveSupplierTransProfile({
        supplier_id: this.sellerUserId,
        name_on_account: this.transForm.value.name_on_account,
        account_number: this.transForm.value.account_number,
        routing_number: this.transForm.value.routing_number
        }).subscribe(
          (res) => {
            this._router.navigate(['/product-profile'],  { queryParams: { userId: this.sellerUserId, name: this.business_name } });
            console.log(res);
          }
        );
      } else {
        console.error('Seller user ID is undefined. Unable to make the API call.');
        // Handle the case where sellerUserId is undefined
      }
  }
  
}
