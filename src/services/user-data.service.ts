import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class UserDataService {
    private sellerUserIdSubject = new BehaviorSubject<string>(''); 
    sellerUserId$ = this.sellerUserIdSubject.asObservable();
  
    setSellerUserId(sellerUserId: string): void {
      this.sellerUserIdSubject.next(sellerUserId);
    }
  }
