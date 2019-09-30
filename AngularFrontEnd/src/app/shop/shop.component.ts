import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { InteractionService } from '../interaction.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  items :[];
  gender : String;
  title : String;
  id : String;
  size : String;
  cartLength:string ;
  selectSize:boolean =false;
  mode:string='Add to cart';


  constructor(public serverService : ServerService,
              public sharedService:SharedService,
              private activatedRouterService:ActivatedRoute ,
              private interactionService:InteractionService,
              private router:Router) { 

  }

  ngOnInit() {
    this.gender=this.activatedRouterService.snapshot.data.gender;

      if (this.gender==='men'){
        this.title="Men's";
        this.serverService.getItemsByGender('men').subscribe(res=>{
          this.items=res as any;
          console.log('getting items',res);

        })
      }
      else if(this.gender==='women'){
        this.title="Women's";    
        this.serverService.getItemsByGender('women').subscribe(res=>{
          this.items=res as any;
          console.log('getting items',res);

        })
      }
      else if(this.gender==='kids'){
        this.title='Kids';
        this.serverService.getItemsByGender('kids').subscribe(res=>{
          this.items=res as any;
          console.log('getting items',res);

        })
      }
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
