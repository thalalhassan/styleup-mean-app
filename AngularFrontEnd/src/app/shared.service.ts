import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { Router } from '@angular/router';
import { InteractionService } from './interaction.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  constructor(private router:Router,) { }


  
  viewItem(item:any){
    localStorage.setItem('item',JSON.stringify(item))
    this.router.navigate(['/shopitem']) 
  }

  getToken(){
    return {
      userToken:localStorage.getItem('userToken'),
      adminToken:localStorage.getItem('adminToken')
    };
  }

  signedIn(){
    return {
      userToken:!!localStorage.getItem('userToken'), 
      adminToken:!!localStorage.getItem('adminToken')
    };
  }

  
}
