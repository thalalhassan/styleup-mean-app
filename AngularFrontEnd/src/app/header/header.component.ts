import { Component, OnInit } from '@angular/core';
import { InteractionService } from '../interaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userIn:boolean;
  adminIn:boolean;
  userName:String;
  cartLength:Number;

  constructor(private router : Router , private interactionService:InteractionService) { 
    this.interactionService.isUserLoggedIn.subscribe( value => {
      this.userIn = value;
      if(localStorage.getItem('userName')){
        this.userIn = true;
      }
    });
    this.interactionService.isAdminLogIn.subscribe( value => {
      this.adminIn = value;
    });
    this.interactionService.cartLength.subscribe( value => {
      this.cartLength = value;
      if (value == 0){
        if(localStorage.getItem('cartLength')){
          this.cartLength=parseInt(localStorage.getItem('cartLength'));
        }
      }
    });

    this.interactionService.userName.subscribe( value => {
      this.userName = value;
      if(localStorage.getItem('userName')){
        this.userName=localStorage.getItem('userName');
      }
    });
  }

 
  ngOnInit() {

  }

  adminlogOut(){
    localStorage.clear();
    this.adminIn=false;
    this.interactionService.isAdminLogIn.next(false)
    this.router.navigate(['/admin'])
  }

  logOut(){
    localStorage.clear();
    this.userIn=false;
    this.interactionService.isUserLoggedIn.next(false)
    this.interactionService.cartLength.next(-1)
    this.router.navigate(['/'])
  }
 
}
