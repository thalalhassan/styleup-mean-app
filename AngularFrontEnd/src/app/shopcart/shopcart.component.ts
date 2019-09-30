import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';
import { InteractionService } from '../interaction.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shopcart',
  templateUrl: './shopcart.component.html',
  styleUrls: ['./shopcart.component.css']
})
export class ShopcartComponent implements OnInit {
  items :any;
  userId:String
  cartLength:string;
  mode:String ='remove';

  constructor(private serverService : ServerService,private router :Router,private interactionService:InteractionService,private _location:Location) { }

  ngOnInit() {
    this.mode='remove'
    this.userId = localStorage.getItem('userId')
    if(this.userId){
      this.serverService.getCart(this.userId).subscribe(res=>{
      this.items= res.cart.cartItem;
      this.cartLength= res.cart.cartItem.length
      this.interactionService.cartLength.next(parseInt(this.cartLength))
      localStorage.setItem('cartLength',this.cartLength)
      },
      err=>{
  
      })
    }
    else{
      alert('Please signIn');
      this.router.navigate(['/signin'])
    }
  }

  removeCartItem(item){      
      this.serverService.removeCartItem(item,this.userId,this.mode).subscribe((res)=>{
          console.log(res)
          this.cartLength= res.cart.cartItem.length
          console.log(this.cartLength)
          this.interactionService.cartLength.next(parseInt(this.cartLength)-1)
          localStorage.setItem('cartLength',JSON.stringify(parseInt(this.cartLength)-1))
          this.ngOnInit();
      },err=>{
          console.log(err)
      })
  }

  checkOut(item){
    this.serverService.placeOrder(item,this.userId).subscribe(data =>{
      if(data.flag==true){
        this.mode='order'
        this.removeCartItem(item)
      }
      alert(data.msg +"\nItem Left :"+ data.itemLeft);
  })
  }
}