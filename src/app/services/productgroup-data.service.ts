import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { AuthResponse } from "../models/authresponse";
import { Product } from "../models/product";
import { BROWSER_STORAGE } from "../storage";
import { User } from "../models/user";
import { ProductGroup } from '../models/productgroup';



@Injectable({
  providedIn: 'root'
})
export class ProductGroupDataService {

  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private storage: Storage) { }

  private apiBaseUrl = 'https://localhost:44345/api/';
  private productUrl = `${this.apiBaseUrl}ProductGroups/`;

  public addProductGroup(formData: ProductGroup): Promise<ProductGroup> {

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("web-token")}`,
    });
    return this.http
      .post(this.productUrl, formData, { headers: headers })
      .toPromise()
      .then((response) => response as ProductGroup[])
      .catch(this.handleError);
  }

  public getProductGroups(): Promise<ProductGroup[]> {

    return this.http
      .get(this.productUrl)
      .toPromise()
      .then(response => response as ProductGroup[])
      .catch(this.handleError);
  };

  public getProductGroup(productGroupCode: string): Promise<ProductGroup> {

    return this.http
      .get(this.productUrl + productGroupCode)
      .toPromise()
      .then(response => response as ProductGroup)
      .catch(this.handleError);
  };

  public deleteProductGroup(productId: Number): Promise<ProductGroup[]> {

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("web-token")}`,
    });
    return this.http
      .delete(this.productUrl + productId, { headers: headers })
      .toPromise()
      .then(response => response as ProductGroup[])
      .catch(this.handleError);
  };

  

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  

  

  
}
