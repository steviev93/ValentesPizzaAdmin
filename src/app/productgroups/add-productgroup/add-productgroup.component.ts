import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductGroupDataService } from '../../services/productgroup-data.service';

@Component({
  selector: 'app-add-productgroup',
  templateUrl: './add-productgroup.component.html',
  styleUrls: ['./add-productgroup.component.css']
})
export class AddProductGroupComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;

  constructor(
  private formBuilder: FormBuilder,
  private router: Router,
  private productGroupService: ProductGroupDataService
  ) { 
    this.addForm = formBuilder.group({
      title: formBuilder.control('initial value', Validators.required)
  });
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      name: ['', Validators.required],
    })
  }

  onSubmit() {
    this.submitted = true;
    if(this.addForm.valid){
    this.productGroupService.addProductGroup(this.addForm.value)
    .then( data => {
      console.log(data);
      this.router.navigate(['']);
    }).catch(function () {
      console.log("Promise Rejected");
 });
  }
}

// get the form short name to access the form fields
get f() { return this.addForm.controls; }
}