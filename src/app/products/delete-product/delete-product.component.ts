import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductDataService } from '../../services/product-data.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  productCode:String;
  deleteForm:FormGroup;
  product:Product;
  message:String;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductDataService
  ) { 
    this.productCode = "";
    this.deleteForm = formBuilder.group({
      title: formBuilder.control('initial value', Validators.required)
  });
    this.product = {} as Product;
    this.message = "";
  }

  ngOnInit() {
    // retrieve stashed tripId
    let productCode = localStorage.getItem("productCode") as string;
    if (!productCode) {
      alert("Something wrong, couldn't find where I stashed productCode!");
      this.router.navigate(['']);
      return;
    }
    this.productService
    .getProduct(productCode)
    .then(foundProduct => {
        this.message = foundProduct == null ? '' : 'No products found';
        this.product = foundProduct as Product;
      });

    // initialize form
    this.deleteForm = this.formBuilder.group({
      _id: [this.product.id],
      name: [this.product.name, Validators.required],
      description: [this.product.description, Validators.required],
      price: [this.product.price, Validators.required]
    })
  }

   onSubmit() {
    if (this.deleteForm.valid) {
      this.productService.deleteProduct(this.deleteForm.value.id)
        .then(data => {
          console.log(data);
          this.router.navigate(['']);
      });
    }
  }

  get f() {
    return this.deleteForm.controls;
  }
}