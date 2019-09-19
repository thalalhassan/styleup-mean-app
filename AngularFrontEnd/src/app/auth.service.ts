import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private  signinUrl = 'http://localhost:3030/signin';

  constructor(private http:HttpClient ,private router:Router) { }

  signIn(user){
    alert(JSON.stringify(user))
    return this.http.post<any>(this.signinUrl,{user});
  }

  getToken(){
    return localStorage.getItem('token')
  }

  signedIn(){
    return !!localStorage.getItem('token')
  }
  
}
