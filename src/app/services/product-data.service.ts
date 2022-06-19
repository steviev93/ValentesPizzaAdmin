import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";


import { AuthResponse } from "../models/authresponse";
import { Product } from "../models/product";
import { BROWSER_STORAGE } from "../storage";
import { User } from "../models/user";
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private storage: Storage) { }

  private apiBaseUrl = 'https://localhost:44345/api/';
  private productUrl = `${this.apiBaseUrl}products/`;

  public addProduct(formData: Product) {

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("web-token")}`,
    });
    return this.http
      .post(this.productUrl, formData, { headers: headers })
      .pipe(map((response) => response as Product[]));
  }

  public getProducts() {

    return this.http
      .get(this.productUrl)
      .pipe(map((response) => response as Product[]));
  };

  public getProduct(tripCode: string) {

    return this.http
      .get(this.productUrl + tripCode)
      .pipe(map((response) => response as Product));
  };

  public deleteProduct(productId: Number) {

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("web-token")}`,
    });
    return this.http
      .delete(this.productUrl + productId, { headers: headers })
      .pipe(map((response) => response as Product[]));;
  };

  public updateProduct(formData: Product) {
    
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("web-token")}`,
    });
    return this.http
      .put(this.productUrl + formData.id, formData, { headers: headers })
      .pipe(map((response) => response as Product));;
  }
  
}
