import { Component, OnInit } from '@angular/core';
import {GlobalsService} from 'src/services/globals.service';

@Component({
  selector: 'app-new-roasted-batch',
  templateUrl: './new-roasted-batch.component.html',
  styleUrls: ['./new-roasted-batch.component.css']
})
export class NewRoastedBatchComponent implements OnInit {

  cupping_type:any='';
  cupping:any;
  showCupping:boolean = true;
  langChips : any = [];
  selectable = true;
  removable = true;
  appLanguage: any;

  constructor( private globals: GlobalsService) { }

  ngOnInit(): void {
    this.cupping = '';
    this.appLanguage = this.globals.languageJson;

  }
  setCupping(cuppdata:any){
    this.cupping=cuppdata;
  }
  toggleCupping(){
    this.showCupping=!this.showCupping;
    if(this.showCupping==false){
			document.getElementById('cupping_id').style.border="1px solid #d6d6d6";
		}
		else{
			document.getElementById('cupping_id').style.border="1px solid #d6d6d6";
		
		}
  }

  addLang(value:any) {
    // const input = event.input;
    // const value = event.value;
  
    // Add our fruit
    if ((value || '').trim()) {
      this.langChips.push(value.trim());
    }
  
    // // Reset the input value
    // if (input) {
    //   input.value = '';
    // }
  
  }
  
  remove(lang: string): void {
    const index = this.langChips.indexOf(lang);
  
    if (index >= 0) {
      this.langChips.splice(index, 1);
    }
  }

}
