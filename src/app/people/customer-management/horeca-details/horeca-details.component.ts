import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'app-horeca-details',
  templateUrl: './horeca-details.component.html',
  styleUrls: ['./horeca-details.component.css']
})
export class HorecaDetailsComponent implements OnInit {
  appLanguage?: any;

  constructor(private globals: GlobalsService) { }

  ngOnInit(): void {
    $('.btn-toggle').click(function () {
      $(this).find('.btn').toggleClass('active');
      $(this).find('.btn').toggleClass('active_default');
      $(this).find('.btn').toggleClass('disable_default');
    });
    this.appLanguage = this.globals.languageJson;

  }

}
