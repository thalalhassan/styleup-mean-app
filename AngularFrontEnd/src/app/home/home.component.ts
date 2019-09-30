import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';
import { InteractionService } from '../interaction.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items : any = [];
  constructor(private serverService :ServerService,private router:Router,private interactionService:InteractionService,public sharedService:SharedService) { 
    this.interactionService.isAdminLogIn.subscribe( value => {
      if(value)
           this.interactionService.isAdminLogIn.next(false)

    });
  }

  ngOnInit() {
    this.serverService.getItems().subscribe(res=>{
      console.log('getting items',res);
      this.items = res;
    });
  }

  explore(gender){
    if(gender == 'men'){
      this.router.navigate(['/shop/men'])
    }else if(gender == 'women'){
      this.router.navigate(['/shop/women'])
    }else if(gender=='kids'){
      this.router.navigate(['/shop/kids'])
    }
  }

}
