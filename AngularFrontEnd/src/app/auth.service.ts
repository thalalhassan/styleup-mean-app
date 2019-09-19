import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private additemUrl = 'http://localhost:3030/additem';

  constructor(private http:HttpClient ,private router:Router) { }

  
  addItem(item){
    alert(JSON.stringify(item));
    return this.http.post<any>(this.additemUrl,{item});
  }

  getToken(){
    return localStorage.getItem('token');
  }

  signedIn(){
    return !!localStorage.getItem('token');
  }
  
}
