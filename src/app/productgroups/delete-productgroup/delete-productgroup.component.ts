import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductGroupDataService } from '../../services/productgroup-data.service';

@Component({
  selector: 'app-delete-productgroup',
  templateUrl: './delete-productgroup.component.html',
  styleUrls: ['./delete-productgroup.component.css']
})
export class DeleteProductGroupComponent implements OnInit {

  productGroupCode:String;
  deleteForm:FormGroup;
  productGroupName:String;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productGroupService: ProductGroupDataService
  ) { 
    this.productGroupCode = "";
    this.productGroupName = "";
    this.deleteForm = formBuilder.group({
      title: formBuilder.control('initial value', Validators.required)
  });
  }

  ngOnInit(): void {
    
    let productGroupCode = localStorage.getItem("productGroupCode");
    this.deleteForm = this.formBuilder.group({
      _id: [productGroupCode],
      name: [this.productGroupName, Validators.required],
      
    })
    if (!productGroupCode) {
      alert("Something wrong, couldn't find where I stashed productGroupCode!");
      this.router.navigate(['']);
      return;
    }
    this.productGroupService
    .getProductGroup(productGroupCode)
    .then(foundProductGroups => {
      
      this.productGroupName = foundProductGroups.name;
      this.deleteForm.controls['name'].setValue(this.productGroupName);
      console.log(this.productGroupName);
    });
    // initialize form
    
    
    

    
  }

   onSubmit() {
    if (this.deleteForm.valid) {
      this.productGroupService.deleteProductGroup(this.deleteForm.value.id)
        .then(data => {
          this.router.navigate(['']);
      });
    }
  }

  get f() {
    return this.deleteForm.controls;
  }
}
