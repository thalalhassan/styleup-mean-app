import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router ) { }

  ngOnInit() {
  }

  model: any = {};

  onSubmit() {
    this.authService.signIn(this.model).subscribe( res =>{
      // alert('Message!! :-)\n\n' +JSON.parse(JSON.stringify(res)).msg)
      localStorage.setItem('token',res.token )
      console.log(res.token)
      this.router.navigate(['/'])

    },
    err =>{
      console.log(err)
    })

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model, null, 4));
  }
}
