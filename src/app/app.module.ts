import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-router.module';
import { ProductListingComponent } from './products/product-listing/product-listing.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ProductDataService } from './services/product-data.service';
import { ProductGroupDataService } from './services/productgroup-data.service';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { DeleteProductComponent } from './products/delete-product/delete-product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProductGroupComponent } from './productgroups/add-productgroup/add-productgroup.component';
import { DeleteProductGroupComponent } from './productgroups/delete-productgroup/delete-productgroup.component';
import { ProductGroupListingComponent } from './productgroups/productgroup-listing/productgroup-listing.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListingComponent,
    ProductCardComponent,
    AddProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    AddProductGroupComponent,
    DeleteProductGroupComponent,
    ProductGroupListingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    ProductDataService,
    ProductGroupDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
