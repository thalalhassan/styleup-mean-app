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
import { ShopItemComponent } from './shop-item/shop-item.component';
import { AdminGuard } from './admin.guard';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path: 'shop',
    children: [
      { path: 'men', component: ShopComponent ,data :{gender : 'men'}},
      { path: 'women', component: ShopComponent ,data:{gender :'women'} },
      { path: 'kids', component: ShopComponent , data : { gender : 'kids'} },
    ]},
  {path:'shopcart',canActivate:[AuthGuard],component:ShopcartComponent},
  {path:'shopitem',component:ShopItemComponent,data:{}},
  {path:'admin',component:AdminComponent},
  {path:'additem',canActivate:[AdminGuard],component:AdditemComponent},
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
