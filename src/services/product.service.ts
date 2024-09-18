// used to hit our backend endpoint to retrieve product data from the database

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductType } from 'src/app/interfaces/product-type';
import { ContinentCountries } from 'src/app/interfaces/continent-countries';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) { }

  getCountriesByContinent(continent: string | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/CountriesByContinent?continent=${continent}`);
  }

  getTypeByCountry(country: string | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/TypeByCountry?country=${country}`);
  }

  getProductsByCountryType(country: any | null, type: string | undefined): Observable<any> {
    return this.http.get(`${this.apiUrl}/productsByCountryType?country=${country}&type=${type}`);
  } 

  getProductTypes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/productTypes`)
  }

  getProductsByType(type: string | undefined): Observable<any> {
    return this.http.get(`${this.apiUrl}/productsByType?type=${type}`);
  }

  getProductsByRating(): Observable<any> {
    return this.http.get(`${this.apiUrl}/productsByRating`)
  }

  getProductById(productId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/productById?${productId}`);
  }

  getDeals(): Observable<any> {
    return this.http.get('');
  }

  getRatings(id: number | undefined): Observable<any> {
    return this.http.get(`${this.apiUrl}/ratingsOfProduct?id=${id}`);
  }

}