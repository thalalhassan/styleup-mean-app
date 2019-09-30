import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  user: any = {};
  errorMessage:boolean=false;

  constructor(public serverService:ServerService , private router:Router) {
    if(!!localStorage.getItem('userToken')){
      this.router.navigate(['/'])
    }
   }

  ngOnInit() {
  }


  onSubmit() {
    this.serverService.signUp(this.user).subscribe(data=>{
     console.log('Message!! '+JSON.parse(JSON.stringify(data)).msg)
      this.router.navigate(['/signin'])
    },
    err =>{
      this.errorMessage=true;
      console.log(err)
    })

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.user, null, 4));
  }

}
