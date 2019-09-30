import { Component, OnInit } from '@angular/core';
import { Item } from '../model/item.model';
import { SharedService } from '../shared.service';
import { InteractionService } from '../interaction.service';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.css']
})
export class ShopItemComponent implements OnInit {

  item : Item;
  id : String;
  size : String;
  cartLength:string ;
  selectSize:boolean =false;
  mode:String='Add to cart';

  constructor(public sharedService : SharedService,private interactionService:InteractionService,private serverService:ServerService , private router:Router ,) { 
    this.item =JSON.parse(localStorage.getItem('item'))

  }

  ngOnInit() {
    this.id = localStorage.getItem('userId')  
  }

  addToCart(item){
    if(this.id){
          if(this.size){
            this.serverService.addCart(this.id,item,this.size).subscribe(res=>{
                  this.cartLength= res.cart.cartItem.length
                  console.log(this.cartLength)
                  this.interactionService.cartLength.next(parseInt(this.cartLength)+1)
                  localStorage.setItem('cartLength',JSON.stringify(parseInt(this.cartLength)+1))
                  alert(res.msg)
                  this.selectSize=false
                  this.size=undefined;
                  if(this.mode=='Buy Now'){
                    this.router.navigate(['/shopcart']) 
                  }
          },
          err=>{
            alert('error')
          })
          }else{
              this.selectSize=true
          }
  }else{
    alert('Please signIn');
    this.router.navigate(['/signin'])
    }
    
  }

  selectedSize(size,item){
    if(item.itemSize[size] <= 0 ){
     alert('item size not available');
     return false;
     }else{
       this.size = size
     }
    }
  
  cancel(){
    this.mode='Add to cart'
    this.selectSize=false;
  }
  
  buyItem(){
    if(this.id){
      this.mode='Buy Now'
      this.selectSize=true
    }else{
      alert('Please signIn');
      this.router.navigate(['/signin'])
    }
    
  }



}
