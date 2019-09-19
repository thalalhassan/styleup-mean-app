import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { ShopcartComponent } from './shopcart/shopcart.component';
import { ShopComponent } from './shop/shop.component';
import { AdditemComponent } from './additem/additem.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'shop',canActivate:[AuthGuard],component:ShopComponent},
  {path:'shopcart',component:ShopcartComponent},
  {path:'admin',component:AdminComponent},
  {path:'additem',component:AdditemComponent},
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
