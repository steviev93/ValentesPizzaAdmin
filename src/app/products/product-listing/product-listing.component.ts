import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDataService } from '../../services/product-data.service';
import { Product } from '../../models/product';
import { AuthenticationService } from '../../services/authentication';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css'],
  providers: [ProductDataService]
})
export class ProductListingComponent implements OnInit {

  products: Product[];
  message: string;
  constructor(
    private productDataService: ProductDataService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.products = [];
    this.message = '';
  }

  addProduct(): void {

    this.router.navigate(['add-product']);
  }

  private getProducts(): void {

    this.message = 'Searching for products';
    this.productDataService
      .getProducts()
      .then(foundProducts => {
        this.message = foundProducts.length > 0 ? '' : 'No products found';
        this.products = foundProducts;
      });
  }
  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  ngOnInit(): void {
    this.getProducts();
  }

}
