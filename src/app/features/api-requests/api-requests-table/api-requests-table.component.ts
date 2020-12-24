import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';


@Component({
  selector: 'app-api-requests-table',
  templateUrl: './api-requests-table.component.html',
  styleUrls: ['./api-requests-table.component.css']
})
export class ApiRequestsTableComponent implements OnInit {
  appLanguage?: any ={};
  greenActive:any =0;
  constructor(public globals: GlobalsService) { }

  ngOnInit(): void {
   
    this.language();

  }

  
  language(){
   
    this.appLanguage = this.globals.languageJson;
   this.greenActive++;

  }

}
