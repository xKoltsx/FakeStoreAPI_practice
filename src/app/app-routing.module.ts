import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {ProductsComponent} from "./products/products.component";
import {LoginComponent} from "./login/login.component";
import {CartComponent} from "./cart/cart.component";

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'profile', component: ProfileComponent},
  {path:'products', component: ProductsComponent},
  {path:'login', component: LoginComponent},
  {path:'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
