import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { AuthResponse } from "../models/authresponse";
import { Product } from "../models/product";
import { BROWSER_STORAGE } from "../storage";
import { User } from "../models/user";
import { ProductGroup } from '../models/productgroup';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ProductGroupDataService {

  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private storage: Storage) { }

  private apiBaseUrl = 'https://localhost:44345/api/';
  private productUrl = `${this.apiBaseUrl}ProductGroups/`;

  public addProductGroup(formData: ProductGroup){

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("web-token")}`,
    });
    return this.http
      .post(this.productUrl, formData, { headers: headers })
      .pipe(map((response) => response as ProductGroup[]));
  }

  public getProductGroups() {

    return this.http
      .get(this.productUrl)
      .pipe(map((response) => response as ProductGroup[]));

  };

  public getProductGroup(productGroupCode: string) {

    return this.http
      .get(this.productUrl + productGroupCode)
      .pipe(map((response) => response as ProductGroup));
      ;
  };
  // no need for update
  public deleteProductGroup(productId: Number) {

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("web-token")}`,
    });
    return this.http
      .delete(this.productUrl + productId, { headers: headers })
      .pipe(map((response) => response as ProductGroup[]));;

  };
  
  // got rid of vague handleError method, implement specific ones in the view
}
