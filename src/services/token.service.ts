import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private refreshInterval: number = 1 * 60; // 15 minutes
  private refreshSubscription: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) { }

  startTokenRefresh(): void {
    this.refreshSubscription = interval(this.refreshInterval) // creating an observable within interval to omit every 10 mins
    .pipe(
      switchMap(() => this.authService.refreshToken(this.authService.getToken())) // getting new token
    ).subscribe(
      (res) => {
        const newToken = res.accessToken;
        localStorage.setItem('token', newToken);  // save new token
      },
      (error) => {
        console.error('Error refreshing token: ', error);
        this.router.navigate(['/log-in']);
      }
    );
  }

  // call after user logs out
  // call when navigating to unauthenticated pages
  // call if session timeout or inactivity
  stopTokenRefresh(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
}
