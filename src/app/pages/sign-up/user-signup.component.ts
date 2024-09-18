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
import {ReactiveFormsModule} from '@angular/forms'
import { NotificationService } from 'src/services/notification.service';
import { UserDataService } from 'src/services/user-data.service';


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
    templateUrl: './user-signup.component.html',
    styleUrls: ['./user-signup.component.scss']
})

export class UserSignUpComponent implements OnInit {
  sellerSignupForm!: FormGroup;
  buyerSignupForm!: FormGroup;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.initializeSellerForm();
    this.initializeBuyerForm();
}

  initializeSellerForm() {
    this.sellerSignupForm = this.formBuilder.group({
        seller_user_id: ['', Validators.required],
        seller_user_role_id: 's',
        seller_password: ['', Validators.required],
        seller_verifyPassword: ['', Validators.required]
    });
}

initializeBuyerForm() {
    this.buyerSignupForm = this.formBuilder.group({
        buyer_user_id: ['', Validators.required],
        buyer_user_role_id: 'c',
        buyer_password: ['', Validators.required],
        buyer_verifyPassword: ['', Validators.required]
    });
}
  
  onSubmit(userType: string) {
    console.log(userType);
    if (userType == 'seller'){
      console.log("Your form data: ", this.sellerSignupForm.value);
      console.log("Your form data: ", this.sellerSignupForm.value.seller_user_id);

      this._auth.signupFindByUserId(this.sellerSignupForm.value.seller_user_id).subscribe(
        (res) => {
            console.log(res);

            if (res) {
                console.log("inside if res func", this.sellerSignupForm.value.seller_user_id,
                  this.sellerSignupForm.value.seller_user_role_id,
                  this.sellerSignupForm.value.seller_password,
                  this.sellerSignupForm.value.seller_verifyPassword);

                  const email = this.sellerSignupForm.value.seller_user_id;
                  if (email && email.indexOf('@') === -1) {
                    this.notificationService.showNotification('Invalid Email: Email does not contain "@" symbol.');
                    return;
                }

                  if(this.sellerSignupForm.value.seller_user_id)

                this._auth.save(
                  this.sellerSignupForm.value.seller_user_id,
                  this.sellerSignupForm.value.seller_user_role_id,
                  this.sellerSignupForm.value.seller_password,
                  this.sellerSignupForm.value.seller_verifyPassword
                ).subscribe(
                    (saveRes) => {
                      this._router.navigate(['/seller-profile'], { queryParams: { userId: this.sellerSignupForm.value.seller_user_id } });
                      console.log("Save data response: ", saveRes);
                      //this._auth.sendEmailVerification(this.sellerSignupForm.value.seller_user_id)
                    },
                    (saveError) => {
                      this.notificationService.showNotification('User already exists or passwords dont match.');
                      console.log("User already exists", saveError);
                    }
                );
            }
        },
        (error) => {
            console.error("Error during signupFindByUserId:", error);
        }
    );
    }
    else if(userType == 'buyer'){
      console.log("Your form data : ", this.buyerSignupForm.value);
      this._auth.signupFindByUserId(this.buyerSignupForm.value.buyer_user_id).subscribe(
        (res) => {
            console.log(res);

            if (res) {
                console.log("inside if res func", this.buyerSignupForm.value.user_id, 
                this.buyerSignupForm.value.buyer_user_role_id,
                this.buyerSignupForm.value.buyer_password,
                this.buyerSignupForm.value.buyer_verifyPassword);

                const email = this.buyerSignupForm.value.buyer_user_id;
                  if (email && email.indexOf('@') === -1) {
                    this.notificationService.showNotification('Invalid Email: Email does not contain "@" symbol.');
                    return;
                  }

                this._auth.save(
                  this.buyerSignupForm.value.buyer_user_id,
                  this.buyerSignupForm.value.buyer_user_role_id,
                  this.buyerSignupForm.value.buyer_password,
                  this.buyerSignupForm.value.buyer_verifyPassword
                ).subscribe(
                    (saveRes) => {
                      this._router.navigate(['/buyer-profile'], { queryParams: { userId: this.buyerSignupForm.value.buyer_user_id } });
                      console.log("Save data response: ", saveRes);
                    },
                    (saveError) => {
                      this.notificationService.showNotification('User already exists or passwords dont match.');
                      console.error("User already exists", saveError);
                    }
                );
            }
        },
        (error) => {
            console.error("Error during signupFindByUserId:", error);
        }
    );
    }
    
  }

}