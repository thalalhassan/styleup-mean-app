import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAdminLogIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userName: BehaviorSubject<String> = new BehaviorSubject<String>('');
  public cartLength: BehaviorSubject<Number> = new BehaviorSubject<Number>(0);


  
  
  constructor(private router:Router) { }


}













  
  // public role$ = new Subject<String>();
  // public item$ = new Subject<any>();
  // public userIn$ = new Subject<String>();
  // or public gender = new Subject<String>();
  //    gender$ = this.gender.asObservable();  // $ for asObservable
  //to send gender to those whose access gender$ observable
  // setRole(role : String){
  //   this.role$.next(role);
  // }
  // setItem(item){
  //   console.log("in set"+item)
  //   this.item$.next(item);
  // }
  // setUserIn(user){
  //   this.userIn$.next(user);
  // }