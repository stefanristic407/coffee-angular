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

  constructor(public globals: GlobalsService) { }

  	ngOnInit(): void {
    	this.language();
	}
    language(){
      this.appLanguage = this.globals.languageJson;
      this.customerActive++;
    }
}
