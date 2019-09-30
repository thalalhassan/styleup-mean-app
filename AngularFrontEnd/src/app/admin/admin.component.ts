import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';
import { InteractionService } from '../interaction.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  submitted = false;
  errorMessage=false;
  constructor(private serverService : ServerService ,private router:Router ,private interactionService:InteractionService) { }

  admin : any={
    adminName : 'admin',  
    password : '12345678'
  };

  ngOnInit() {
  }

  onSubmit(){
    this.submitted = true;
    this.serverService.admin(this.admin).subscribe( res =>{
      localStorage.setItem('adminToken',res.token )
      this.interactionService.isAdminLogIn.next(true);
      this.interactionService.isUserLoggedIn.next(false);
      this.router.navigate(['/additem'])

    },
    err =>{
      this.errorMessage=true;
      console.log(err)
    })

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model, null, 4));
  }

}
