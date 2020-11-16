import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
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
