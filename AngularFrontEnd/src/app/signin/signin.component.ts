import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';
import { InteractionService } from '../interaction.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  userName:string;
  errorMessage:boolean=false;
  cartLength:string;
  
  constructor(private serverService:ServerService,private interactionService: InteractionService ,private router:Router ,private _location:Location) { }

  ngOnInit() {
  }

  user: any = {};

  onSubmit() {
    this.serverService.signIn(this.user).subscribe( res =>{
      localStorage.setItem('userToken',res.token)
      localStorage.setItem('userId',res.user._id)

      this.userName = res.user.userName;
      localStorage.setItem('userName',this.userName)
      this.interactionService.userName.next(this.userName);
      this.interactionService.isUserLoggedIn.next(true);
      
      this.serverService.getCart(res.user._id).subscribe(res =>{
        this.cartLength=res.cart.cartItem.length;
        console.log(this.cartLength)
        localStorage.setItem('cartLength',this.cartLength)
        this.interactionService.cartLength.next(parseInt(this.cartLength))
      },err=>{
        this.errorMessage=true;
        console.log(err)
      })

      
      this._location.back();

    },err =>{
       this.errorMessage=true;
       console.log(err)
    })
  }
}
