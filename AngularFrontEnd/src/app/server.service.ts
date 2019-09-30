import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Item } from './model/item.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private  signinUrl = 'user/signin';
  private  signupUrl = 'user/signup';
  private  adminUrl = 'admin/signin';
  private  getitemsUrl = 'getitems';
  private  orderUrl = 'cart/order';
  private additemUrl = 'admin/additem';
  private deleteitemUrl = 'admin/deleteitem';
  private edititemUrl = 'admin/edititem';
  private addcartUrl = 'cart/addtocart';
  private getcartURL = "cart/getcart";
  private removecartUrl = "cart/removecart"

  constructor(private http:HttpClient ,private router:Router ) { }

  item: Item[];

  getItems(){
    return this.http.get(this.getitemsUrl);
  }

  getItemsByGender(gender){
    return this.http.get(this.getitemsUrl+`/${gender}`)
  }

  signIn(user){
    return this.http.post<any>(this.signinUrl,{user});
  }

  signUp(user){
    return this.http.post(this.signupUrl,{user});
  } 

  admin(admin){
    return this.http.post<any>(this.adminUrl,{admin});
  }
  
  placeOrder(item,userId){
    return this.http.post<any>(this.orderUrl, {'item':item,'userId': userId} );
  }

  addItem(item){
    return this.http.post<any>(this.additemUrl,{item});
  }
  editItem(id,item){
    console.log(item);
    return this.http.put<any>(this.edititemUrl+`/${id}`,{item})
  }

  deleteItem(id){
     return this.http.delete(this.deleteitemUrl+`/${id}`)
   }
  
  addCart(id,item,size){
    return this.http.post<any>(this.addcartUrl+`/${id}`,{'item' : item, 'size' : size})
   }

  getCart(id){
    return this.http.get<any>(this.getcartURL+`/${id}`)
   }

  removeCartItem(item,userId,mode){
    return this.http.post<any>(this.removecartUrl+`/${userId}`,{'item' : item ,mode : mode})
  }

}
