import { Component, OnInit } from '@angular/core';
import { RoasteryProfileService } from '../roastery-profile.service';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'sewn-virtual-tour',
  templateUrl: './virtual-tour.component.html',
  styleUrls: ['./virtual-tour.component.css']
})
export class VirtualTourComponent implements OnInit {
  appLanguage: any;

  constructor(public roasteryProfileService : RoasteryProfileService,private globals: GlobalsService) { }

  ngOnInit(): void {
    this.appLanguage = this.globals.languageJson;

  }

}
