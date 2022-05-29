import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { AuthResponse } from "../models/authresponse";
import { Product } from "../models/product";
import { BROWSER_STORAGE } from "../storage";
import { User } from "../models/user";



@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private storage: Storage) { }

  private apiBaseUrl = 'https://localhost:44345/api/';
  private productUrl = `${this.apiBaseUrl}products/`;

  public addProduct(formData: Product): Promise<Product> {

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("web-token")}`,
    });
    return this.http
      .post(this.productUrl, formData, { headers: headers })
      .toPromise()
      .then((response) => response as Product[])
      .catch(this.handleError);
  }

  public getProducts(): Promise<Product[]> {

    return this.http
      .get(this.productUrl)
      .toPromise()
      .then(response => response as Product[])
      .catch(this.handleError);
  };

  public getProduct(tripCode: string): Promise<Product> {

    return this.http
      .get(this.productUrl + tripCode)
      .toPromise()
      .then(response => response as Product)
      .catch(this.handleError);
  };

  public deleteProduct(productId: Number): Promise<Product[]> {

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("web-token")}`,
    });
    return this.http
      .delete(this.productUrl + productId, { headers: headers })
      .toPromise()
      .then(response => response as Product[])
      .catch(this.handleError);
  };

  public updateProduct(formData: Product): Promise<Product> {
    
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("web-token")}`,
    });
    return this.http
      .put(this.productUrl + formData.id, formData, { headers: headers })
      .toPromise()
      .then(response => response as Product[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  

  

  
}
