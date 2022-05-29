import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListingComponent } from './products/product-listing/product-listing.component';
import { ProductGroupListingComponent } from './productgroups/productgroup-listing/productgroup-listing.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { AddProductGroupComponent } from './productgroups/add-productgroup/add-productgroup.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { DeleteProductComponent } from './products/delete-product/delete-product.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DeleteProductGroupComponent } from './productgroups/delete-productgroup/delete-productgroup.component';

const routes: Routes = [
    { path: 'add-product', component: AddProductComponent },
    { path: 'edit-product', component: EditProductComponent },
    { path: 'delete-product', component: DeleteProductComponent },
    { path: 'add-productgroup', component: AddProductGroupComponent },
    { path: 'delete-productgroup', component: DeleteProductGroupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'list-products', component: ProductListingComponent },
    { path: 'list-productgroups', component: ProductGroupListingComponent },
    { path: '', component: HomeComponent, pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }