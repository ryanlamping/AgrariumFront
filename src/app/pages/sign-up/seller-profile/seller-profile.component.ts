import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { NotificationService } from 'src/services/notification.service';
import { UserDataService } from 'src/services/user-data.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    standalone: true,
    imports: [
        CommonModule, 
        HeaderComponent, 
        FooterComponent,
        MatButtonModule, 
        MatRadioModule, 
        FormsModule, 
        MatButtonToggleModule,
        ReactiveFormsModule
      ],
    selector: 'app-user-login',
    templateUrl: './seller-profile.component.html',
    styleUrls: ['./seller-profile.component.scss']
})

export class SellerProfileComponent implements OnInit {
  profileForm!: FormGroup;
  sellerUserId: string | undefined; // Declare the property here

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private userDataService: UserDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeProfileForm();

    this.route.queryParams.subscribe(params => {
      this.sellerUserId = params['userId'];
    });
  }

  initializeProfileForm() {
    this.profileForm = this.formBuilder.group({
      supplier_id: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      business_name: ['', Validators.required],
      business_url: ['', Validators.required],
      business_address: ['', Validators.required],
      phone_no: ['', Validators.required],
      region_id: ['', Validators.required],
      country_id: ['', Validators.required],
      province_id: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.profileForm.value);
  
    if (this.sellerUserId) {
      this._auth.saveSupplierProfile({
        supplier_id: this.sellerUserId,
        first_name: this.profileForm.value.first_name,
        last_name: this.profileForm.value.last_name,
        business_name: this.profileForm.value.business_name,
        business_url: this.profileForm.value.business_url,
        business_address: this.profileForm.value.business_address,
        phone_no: this.profileForm.value.phone_no,
        region_id: this.profileForm.value.region_id,
        country_id: this.profileForm.value.country_id,
        province_id: this.profileForm.value.province_id
      }).subscribe(
        (res) => {
          this._router.navigate(['/trans-profile'],  { queryParams: { userId: this.sellerUserId, name: this.profileForm.value.business_name } });
          console.log(res);
        }
      );
    } else {
      console.error('Seller user ID is undefined. Unable to make the API call.');
      // Handle the case where sellerUserId is undefined
    }
  }
  
}
