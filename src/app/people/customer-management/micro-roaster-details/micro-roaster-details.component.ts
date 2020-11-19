import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'app-micro-roaster-details',
  templateUrl: './micro-roaster-details.component.html',
  styleUrls: ['./micro-roaster-details.component.css']
})
export class MicroRoasterDetailsComponent implements OnInit {
  appLanguage?: any;

  constructor(public globals: GlobalsService) { }

  ngOnInit(): void {
    $('.btn-toggle').click(function () {
      $(this).find('.btn').toggleClass('active');
      $(this).find('.btn').toggleClass('active_default');
      $(this).find('.btn').toggleClass('disable_default');
    });
    this.appLanguage = this.globals.languageJson;

  }

}
