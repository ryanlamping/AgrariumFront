import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { ApiService } from 'src/services/api.service';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { NotificationService } from 'src/services/notification.service';
import { TokenService } from 'src/services/token.service';

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
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class UserLoginComponent implements OnInit {
  isLogin: boolean = false;
  loginForm!: FormGroup;

  constructor(
    private _auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('Your form data: ', this.loginForm.value);
    console.log(this.loginForm.value.user_id);
  
    this._auth.findByUserId(this.loginForm.value.user_id).subscribe(
      (res) => {
        console.log("res: ", res);
        const user = res.user; 
  
        this._auth.login(user.user_id, this.loginForm.value.password).subscribe(
          (loginRes) => {
            console.log("Login response: ", loginRes);
            const token = loginRes.token;
            console.log('res', loginRes);
            console.log(token);
            localStorage.setItem('token', token);
            this.router.navigate(['/my-shop']);
          },
          (loginError) => {
            this.notificationService.showNotification('User does not exist.');
            console.error("Error during login:", loginError);
          }
        );
      },
      (error) => {
        this.notificationService.showNotification('User does not exist.');
        console.error("Error during findByUserId:", error);
      }
    );
  }
  
    

}  
