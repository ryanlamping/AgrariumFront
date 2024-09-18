import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { TestComponent } from './test/test.component';
import { MatIconModule } from '@angular/material/icon';
import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';
import { Chart } from 'chart.js';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HeaderComponent } from './components/header/header.component';
import { MatBadgeModule } from '@angular/material/badge';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FooterComponent,
    BrowserAnimationsModule,
    MatRadioModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    NgChartsModule,
    ChartComponent,
    HeaderComponent,
    CarouselModule.forRoot(),
    MatBadgeModule,
    NgxStripeModule.forRoot('secretKey'),  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
