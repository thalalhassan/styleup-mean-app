import { Injectable ,Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{


  constructor( private injector : Injector ,private router : Router) { }

  intercept(req,next){
    let sharedService =this.injector.get(SharedService);

    let tokenizedReq = req.clone({
      adminToken:req.headers.set('Authorization' , 'bearer ' +sharedService.getToken().adminToken),
      userToken:req.headers.set('Authorization' , 'bearer ' +sharedService.getToken().userToken),
    })
    return next.handle(tokenizedReq)
  }

}
