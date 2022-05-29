import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from "@angular/forms";
import { Router } from "@angular/router";
import { Product } from 'src/app/models/product';
import { ProductGroup } from '../../models/productgroup';
import { ProductDataService } from '../../services/product-data.service';
import { ProductGroupDataService } from '../../services/productgroup-data.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [ProductGroupDataService]
})
export class AddProductComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  selected: string;
  productGroupList: ProductGroup[];
  message: string;

  constructor(
  private formBuilder: FormBuilder,
  private router: Router,
  private productService: ProductDataService,
  private productGroupService: ProductGroupDataService,
  ) { 
    this.addForm = formBuilder.group({
      title: formBuilder.control('initial value', Validators.required)
    });
    this.productGroupList = [];
    this.message = '';
    this.selected = '';
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      productGroup: ['', Validators.required],
      image:['']
    });
    this.getProductGroups();
  }

  onSubmit() {
    this.submitted = true;
    if(this.addForm.valid){
    let product: Product = this.addForm.value;
    product.productGroupId = this.selected;
    this.productService.addProduct(product)
    .then( data => {
      console.log(data);
      this.router.navigate(['']);
    }).catch(function () {
      console.log("Promise Rejected");
 });
  }
}
private getProductGroups(): void {

  this.message = 'Searching for products';
  this.productGroupService
    .getProductGroups()
    .then(foundProductGroups => {
      this.message = foundProductGroups.length > 0 ? '' : 'No products found';
      this.productGroupList = foundProductGroups;
    });
}

// get the form short name to access the form fields
get f() { return this.addForm.controls; }
}