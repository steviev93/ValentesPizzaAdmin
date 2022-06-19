import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { Product } from 'src/app/models/product';
import { UploadService } from 'src/app/services/upload.service';
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
  filename = '';

  imageSource = '';


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductDataService,
    private productGroupService: ProductGroupDataService,
    private uploadService: UploadService
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
      image: []
    });
    this.getProductGroups();
  }

  onSubmit(files : any) {
    this.submitted = true;
    if (this.addForm.valid) {
      let product: Product = this.addForm.value;
      product.productGroupId = this.selected;
      const formData = new FormData();

      if (files[0]) {
        formData.append(files[0].name, files[0]);
      }
      this.uploadService
        .upload(formData)
        .subscribe(({ path }) => (this.imageSource = path));

      this.productService.addProduct(product)
        .subscribe(data => {
          console.log(data);
          this.router.navigate(['']);
        }, error => {
          alert("Problem adding product!");
          this.router.navigate(['']);
        });
    }
  }
  private getProductGroups(): void {

    this.message = 'Searching for products';
    this.productGroupService
      .getProductGroups()
      .subscribe(foundProductGroups => {
        this.message = foundProductGroups.length > 0 ? '' : 'No product groups found';
        this.productGroupList = foundProductGroups;
      }, error => {
        alert("Problem fetching product groups!");
        this.router.navigate(['']);
      });
  }

  setFilename(files: any) {
    if (files[0]) {
      this.filename = files[0].name;
    }
  }

  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }
}