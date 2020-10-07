import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'app-create-roasting-profile',
  templateUrl: './create-roasting-profile.component.html',
  styleUrls: ['./create-roasting-profile.component.css']
})
export class CreateRoastingProfileComponent implements OnInit {
  appLanguage: any;

  constructor( private globals: GlobalsService) { }

  ngOnInit(): void {
    this.appLanguage = this.globals.languageJson;
  }

}
