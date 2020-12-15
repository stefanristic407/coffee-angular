import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  appLanguage?: any;
  btnToggle = true;
  statusChange: string;
  activeFlag: boolean = true;

  grindVariant = [
    {
      price : '',
      grind : '',
      stock : '',
      skunumber : ""
    }
  ]

  constructor(public globals: GlobalsService) { }

  ngOnInit(): void {
    this.appLanguage = this.globals.languageJson;
  }

  activeStatus() {
    this.btnToggle = !this.btnToggle;
    if(this.btnToggle == true){
      this.statusChange = "ACTIVE";
      console.log(this.statusChange)
    }
    else{
      this.statusChange = "INACTIVE";
      console.log(this.statusChange)
    }
  }

  public addNewVariant(){
    this.grindVariant.push({ 
    price : '',
    grind : '',
    stock : '',
    skunumber : ""

    });
}

public deleteRow( index){
    this.grindVariant.splice(index, 1);
  }


}
