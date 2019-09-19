import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private serverService : ServerService ,private router:Router ) { }

  admin : any={
    adminName : 'admin',  
    password : '12345678'
  };

  ngOnInit() {
  }

  onSubmit() {
    this.serverService.admin(this.admin).subscribe( res =>{
      localStorage.setItem('token',res.token )
      console.log(res.token)
      this.router.navigate(['/dashboard'])

    },
    err =>{
      console.log(err)
    })

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model, null, 4));
  }

}
