import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  appLanguage: any;
  settingsActive:any =0;

  constructor(public globals : GlobalsService) { }

  ngOnInit(): void {
    this.language();
  }
  language(){
    this.appLanguage = this.globals.languageJson;
       this.settingsActive++;
    }

}
