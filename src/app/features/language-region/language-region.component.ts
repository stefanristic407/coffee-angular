import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-region',
  templateUrl: './language-region.component.html',
  styleUrls: ['./language-region.component.css']
})
export class LanguageRegionComponent implements OnInit {
  lang : any = '';
  timezone : any = '';
  constructor() { }

  ngOnInit(): void {
  }

}
