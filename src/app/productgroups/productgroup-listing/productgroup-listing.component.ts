import { Component, OnInit } from '@angular/core';
import { ProductGroup } from '../../models/productgroup';
import { ProductGroupDataService } from '../../services/productgroup-data.service';
import { AuthenticationService } from '../../services/authentication';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productgroup-list',
  templateUrl: './productgroup-listing.component.html',
  styleUrls: ['./productgroup-listing.component.css']
})
export class ProductGroupListingComponent implements OnInit {

  productGroups: ProductGroup[];
  message: string;
  constructor(
    private productGroupDataService: ProductGroupDataService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.productGroups = [];
    this.message = '';
  }

  addProductGroup(): void {

    this.router.navigate(['add-productgroup']);
  }

  private getProducts(): void {

    this.message = 'Searching for products';
    this.productGroupDataService
      .getProductGroups()
      .subscribe(foundProductGroups => {
        this.message = foundProductGroups.length > 0 ? '' : 'No product groups found';
        this.productGroups = foundProductGroups;
      }, error => {
        alert("Problem fetching product groups!");
        this.router.navigate(['']);
      });
  }
  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  ngOnInit(): void {
    this.getProducts();
  }
  deleteProductGroup(productGroup: ProductGroup): void{
    // make sure correct productGroupCode is selected
    localStorage.removeItem('productGroupCode');
    localStorage.setItem('productGroupCode', productGroup.id.toString());

    this.router.navigate(['delete-productgroup']);
  }
}
