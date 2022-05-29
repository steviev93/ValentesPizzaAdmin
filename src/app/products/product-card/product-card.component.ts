import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { AuthenticationService } from '../../services/authentication';



@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product:any;
  constructor(private authService:AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }
  editProduct(product: Product): void{

    localStorage.removeItem('productCode');
    localStorage.setItem('productCode', product.id.toString());
    this.router.navigate(['edit-product']);
  }
  deleteProduct(product: Product): void{

    localStorage.removeItem('productCode');
    localStorage.setItem('productCode', product.id.toString());
    this.router.navigate(['delete-product']);
  }
  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
