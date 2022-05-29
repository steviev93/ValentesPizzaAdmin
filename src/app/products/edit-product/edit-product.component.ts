import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductGroup } from 'src/app/models/productgroup';
import { ProductGroupDataService } from 'src/app/services/productgroup-data.service';
import { ProductDataService } from '../../services/product-data.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  editForm: FormGroup;
  message: string;
  submitted = false;
  product: Product;
  productGroup: ProductGroup;
  selected: string;
  productGroupList: ProductGroup[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductDataService,
    private productGroupService: ProductGroupDataService
  ) {
    this.editForm = formBuilder.group({
      title: formBuilder.control('initial value', Validators.required)
    });
    this.product = {} as Product;
    this.message = "";
    this.productGroup = {} as ProductGroup;
    this.selected = '';
    this.productGroupList = [];
  }

  ngOnInit() {
    // retrieve stashed tripId
    let productCode = localStorage.getItem('productCode') as string;
    let product = {} as Product;
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
        this.selected = foundProduct.productGroupId;
        this.getProductGroup(this.selected);

      });

    this.product = product;
    // initialize form
    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      productGroup: ['', Validators.required],
      image: [''],
    });
    this.productService.getProduct(productCode)
      .then(data => {
        console.log(data);
        // Don't use editForm.setValue() as it will throw console error
        this.editForm.patchValue(data as Product);
        this.editForm.controls['id'].setValue(data.id);
      })

  }

  private getProductGroup(productGroupId: string): void {

    this.message = 'Searching for products';
    console.log(productGroupId);
    this.productGroupService
      .getProductGroup(productGroupId)
      .then(foundProductGroup => {
        this.message = foundProductGroup == null ? '' : 'No products found';
        this.productGroup = foundProductGroup;
      });
    this.productGroupService
      .getProductGroups()
      .then(foundProductGroups => {
        this.message = foundProductGroups == null ? '' : 'No product groups found';
        this.productGroupList = foundProductGroups;
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      this.editForm.value.productGroupId = this.selected;
      this.productService.updateProduct(this.editForm.value)
        .then(data => {
          console.log(data);
          this.router.navigate(['']);
        });
    }
  }

  get f() {
    return this.editForm.controls;
  }
}