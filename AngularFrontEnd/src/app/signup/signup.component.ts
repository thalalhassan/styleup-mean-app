import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public serverService:ServerService , private router:Router) { }

  ngOnInit() {
  }

  model: any = {};

  onSubmit() {
    this.serverService.signUp(this.model).subscribe(data=>{

      console.log('Message!! '+JSON.parse(JSON.stringify(data)))
      this.router.navigate(['/signin'])
    })

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model, null, 4));
  }

}
