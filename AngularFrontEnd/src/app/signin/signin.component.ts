import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private serverService:ServerService, private router:Router ) { }

  ngOnInit() {
  }

  model: any = {};

  onSubmit() {
    this.serverService.signIn(this.model).subscribe( res =>{
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
