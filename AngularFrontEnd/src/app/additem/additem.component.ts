import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServerService } from '../server.service';
import { Item } from '../model/item.model';
import { InteractionService } from '../interaction.service';
@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {

  addItem: FormGroup;
  submitted = false;
  items :Item;
  itemUpdate :any =[]
  item_id :String =null;
  add_edit : String ="Add "
  // urlPattern= "/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/"

  // menClothing =['Shirt','T-Shirt','Kurtha','Jeans','Trouser',];
  // womenClothing =['Shirt','T-Shirt','Saree','Jeans','Trouser',];



  constructor(private formBuilder : FormBuilder ,private serverService:ServerService ,private interactionService : InteractionService) {
    this.interactionService.isAdminLogIn.subscribe( value => {
      if(!value)
           this.interactionService.isAdminLogIn.next(true)
    });
   }

  ngOnInit() {

    this.serverService.getItems().subscribe(res=>{
      console.log('getting items',res);
      this.items = res as Item;
    });

    this.addItem = this.formBuilder.group({
      itemCode: ['', Validators.required],
      itemBrand: ['', [Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      itemGender: ['',Validators.required],
      itemStyle: ['',Validators.required],
      itemSleeve: ['',Validators.required],
      itemColour: ['', [Validators.required,Validators.pattern("[a-zA-Z ]*")]],

      itemSize: this.formBuilder.group({
      s: ['',[Validators.required,Validators.min(0), Validators.max(20)]],
      m: ['',[Validators.required,Validators.min(0), Validators.max(20)]],
      l: ['',[Validators.required,Validators.min(0), Validators.max(20)]],
      xl: ['',[Validators.required,Validators.min(0), Validators.max(20)]],
      }),

      itemPrice: ['', [Validators.required,Validators.pattern("[0-9]+"),Validators.min(1), Validators.max(50000)]],
      itemImage: ['',[Validators.required]],
      });
  }
   
  

  get f() { return this.addItem.controls }
  get f2() { return this.addItem['controls'].itemSize['controls'] }

  // get f2() { return this.addItem.controls['sizeItem']; }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addItem.invalid) {
        return;

    }else if(this.item_id == null){

      // add item
      this.items = JSON.parse(JSON.stringify(this.addItem.value));
      this.serverService.addItem(this.items).subscribe((data)=>{
      this.ngOnInit();
      document.getElementById("products").scrollIntoView();
      this.submitted = false;
    });

    }else if(this.item_id != null){

      // update item
      this.itemUpdate = JSON.parse(JSON.stringify(this.addItem.value));
      this.serverService.editItem(this.item_id,this.itemUpdate).subscribe((data)=>{
        this.ngOnInit();
        document.getElementById("products").scrollIntoView();
        this.submitted = false;
        this.add_edit="Add "
      });

    }
   }

  onReset() {
        this.submitted = false;
        this.addItem.reset;
        this.add_edit="Add "

    }

  onEdit(item){
    this.item_id =item._id;
    this.add_edit="Edit"
    this.addItem.patchValue(item);
    document.getElementById("addItem").scrollIntoView();

  }

  onDelete(id){
    if(confirm('Do you want to Delete Item?') == true){
    this.serverService.deleteItem(id).subscribe(res=>{
      console.log(JSON.parse(JSON.stringify(res)).msg)
      this.ngOnInit();
      })
    }
  }

}




