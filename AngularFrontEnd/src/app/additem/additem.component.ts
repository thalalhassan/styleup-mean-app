import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {

  addItem: FormGroup;
  submitted = false;

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit() {
    this.addItem = this.formBuilder.group({
      itemcode: ['', Validators.required],
      itemName: ['', Validators.required],
      itemBrief: ['', Validators.required],
      itemGender: ['', Validators.required],
      itemStyle: ['', Validators.required],
      itemSleeve: ['', Validators.required],
      itemSize: ['', Validators.required],
      itemPrice: ['', Validators.required],
      itemImage: ['', Validators.required],
     
      //acceptTerms: [false, Validators.requiredTrue]
  });
  }

  get f() { return this.addItem.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addItem.invalid) {
        return;
    }
    
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addItem.value, null, 4));
    }

    onReset() {
        this.submitted = false;
        this.addItem.reset();
    }

}
