import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  helper = new JwtHelperService();


  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setDataInLocalStorage(variableName: string, data: string) {
    localStorage.setItem(variableName, data);
  }

  getUserDetails() {
    if (localStorage.getItem('userData')) {
      return localStorage.getItem('userData')
    } else{
      return null
    }
    
  }

  //login

  findByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/login/findByUserId?user_id=${userId}`);
  }

  login(user_id: string, password: string): Observable<any> {
    const credentials = { user_id, password };
    console.log(credentials);
    return this.http.post(`${this.apiUrl}/login/login`, credentials);
  }

  refreshToken(refreshToken: string | null ): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/refresh-token`, { refreshToken });
  }
  
  //signup
  signupFindByUserId(userId: string): Observable<any> {
    console.log("user id: ", userId);
    return this.http.get(`${this.apiUrl}/signup/signupFindByUserId?user_id=${userId}`);
  }
  

  save(user_id: string, user_role_id: string, password: string, verifyPassword: string): Observable<any>{
    const credentials = { user_id, user_role_id, password, verifyPassword };
    console.log("credentials: ", credentials);
    return this.http.post(`${this.apiUrl}/signup/save`, credentials);
  }

  saveSupplierProfile(profileData: any): Observable<any> {
    console.log("credentials: ", profileData);
    return this.http.post(`${this.apiUrl}/supplierProfile/saveSupplierProfile`, profileData);
  }

  saveCustomerProfile(profileData: any): Observable<any> {
    console.log("credentials: ", profileData);
    return this.http.post(`${this.apiUrl}/customerProfile/saveCustomerProfile`, profileData);
  }

  saveSupplierTransProfile(profileData: any): Observable<any> {
    console.log("credentials: ", profileData);
    return this.http.post(`${this.apiUrl}/supplierTransProfile/saveSupplierTransProfile`, profileData);
  }

  saveCustomerTransProfile(profileData: any): Observable<any> {
    console.log("credentials: ", profileData);
    return this.http.post(`${this.apiUrl}/customerTransProfile/saveCustomerTransProfile`, profileData);
  }


  getProductType(typeId: string): Observable<any> {
    console.log("type id: ", typeId);
    return this.http.get(`${this.apiUrl}/uploadProduct/product-type?id=${typeId}`);
  } 

  saveProduct(productData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/uploadProduct/save-product`, productData);
  }

  getUserId() {
    const token = this.getToken();
    console.log(token);
    if (token) {
      const decoded = this.helper.decodeToken(token);
      const userId = decoded.user_id;
      console.log("userId: ", userId);
      return userId;
    }
  }

  getUserRole(token: any) {
    const decoded = this.helper.decodeToken(token);
    const userRole = decoded.user_role_id;
    console.log("user role: ", userRole);
    return userRole;
  }

}
