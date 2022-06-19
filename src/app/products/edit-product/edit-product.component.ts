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
      .subscribe(foundProduct => {
        this.message = foundProduct == null ? '' : 'No products found';
        this.product = foundProduct as Product;
        this.selected = foundProduct.productGroupId;
        this.getProductGroup(this.selected);
      }, error => {
        alert("Something wrong, I couldn't grab the product from the API!");
        this.router.navigate(['']);
      }
      );

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
      .subscribe(data => {
        console.log(data);
        // Don't use editForm.setValue() as it will throw console error
        this.editForm.patchValue(data as Product);
        this.editForm.controls['id'].setValue(data.id);
      }, error => {
        alert("Something wrong, I couldn't grab the product from the API!");
        this.router.navigate(['']);
      })

  }

  private getProductGroup(productGroupId: string): void {

    this.message = 'Searching for products';
    console.log(productGroupId);
    
    // get all product groups, assign productGroup to one whose id matches item to be edited
    this.productGroupService
      .getProductGroups()
      .subscribe(foundProductGroups => {
        this.message = foundProductGroups == null ? '' : 'No product groups found';
        this.productGroupList = foundProductGroups;
        this.productGroup = this.productGroupList.filter(pg => pg.id === this.product.id)[0];
      }, error => {
        alert("Problem fetching product groups!");
        this.router.navigate(['']);
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      this.editForm.value.productGroupId = this.selected;
      this.productService.updateProduct(this.editForm.value)
        .subscribe(data => {
          console.log(data);
          this.router.navigate(['']);
        }, error => {
          alert("Problem updating product!");
          this.router.navigate(['']);
        });
    }
  }

  get f() {
    return this.editForm.controls;
  }
}