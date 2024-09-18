import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSignUpComponent } from '../pages/sign-up/user-signup.component';
import { UserLoginComponent } from '../pages/log-in/log-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FooterComponent,
    HeaderComponent,
    UserSignUpComponent,
    UserLoginComponent
    
  ],
  exports: [
    UserSignUpComponent,
    UserLoginComponent
  ]
})
export class AuthModule { }