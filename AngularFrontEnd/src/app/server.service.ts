import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private  signinUrl = 'http://localhost:3030/signin';
  private  signupUrl = 'http://localhost:3030/signup';
  private  adminUrl = 'http://localhost:3030/admin';
  private  getitemsUrl = 'http://localhost:3030/getitems/gender';


  constructor(private http:HttpClient ,private router:Router) { }

  signIn(user){
    alert(JSON.stringify(user));
    return this.http.post<any>(this.signinUrl,{user});
  }

  signUp(user){
    alert(JSON.stringify(user) )
    return this.http.post(this.signupUrl,{user});
  } 

  admin(admin){
    alert(JSON.stringify(admin) )
    return this.http.post<any>(this.adminUrl,{admin});
  }

  getItems(gender){
    return this.http.post(this.getitemsUrl,{gender})
  }


}
