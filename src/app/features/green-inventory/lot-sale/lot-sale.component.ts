import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'app-lot-sale',
  templateUrl: './lot-sale.component.html',
  styleUrls: ['./lot-sale.component.css']
})
export class LotSaleComponent implements OnInit {
  appLanguage: any;

  constructor(private globals: GlobalsService) { }

  ngOnInit(): void {
    this.appLanguage = this.globals.languageJson;
  }

}
