import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(public http:HttpClient ,public router:Router) { }

  signUp(user){
    
    alert(JSON.stringify(user) )
    return this.http.post('http://localhost:3030/signup',{'user' : user});
  }


}
