import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'app-visit-us',
  templateUrl: './visit-us.component.html',
  styleUrls: ['./visit-us.component.css']
})
export class VisitUsComponent implements OnInit {
  appLanguage?: any;
	brandProfileActive:any=0;
  constructor(public globals : GlobalsService) { }

  ngOnInit(): void {
    this.language();
  }

  language(){
    this.appLanguage = this.globals.languageJson;
    this.brandProfileActive++;
  }


}
