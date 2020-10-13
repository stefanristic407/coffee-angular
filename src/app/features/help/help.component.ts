import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  appLanguage: any;
  helpActive:any=0;

  constructor(private globals : GlobalsService) { }

  ngOnInit(): void {
    this.language();
  }
  language(){
    this.appLanguage = this.globals.languageJson;
       this.helpActive++;
    }
}
