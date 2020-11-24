import { Component, OnInit } from '@angular/core';
import {GlobalsService} from 'src/services/globals.service';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent implements OnInit {
  appLanguage?: any;
  customerActive:any=0;
  
  showVar: boolean = true;
  termStatus: string;

  term: any;
  constructor(public globals: GlobalsService) { 
    
    this.termStatus = '';
  }

  	ngOnInit(): void {
    	this.language();
	}
    language(){
      this.appLanguage = this.globals.languageJson;
      this.customerActive++;
    }
    
  setStatus(term: any) {
    this.termStatus = term;
    console.log(this.termStatus)
  }

    toggleStatus() {
      this.showVar = !this.showVar;
      if(this.showVar==false){
      document.getElementById('status_id').style.border="1px solid #30855c";
    }
    else{
      document.getElementById('status_id').style.border="1px solid #d6d6d6";
    
    }
    }
}
