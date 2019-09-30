import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor (private sharedService:SharedService,private router :Router){}

  canActivate(): boolean {
    if (this.sharedService.signedIn().adminToken){
      console.log('true');
      return true;
    }
    else{
      console.log('false');
      this.router.navigate(['/admin'])
      return false;

    }
  }
  
}
