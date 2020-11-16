import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

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
