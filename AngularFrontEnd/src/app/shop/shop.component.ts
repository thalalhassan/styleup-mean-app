import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  item : any[];
  gender : String;

  constructor(public serverService : ServerService) { }

  ngOnInit() {
    this.serverService.getItems(this.gender).subscribe((data)=>{
      return this.item = JSON.parse(JSON.stringify(data));  
    });
  }


}
