import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'app-lot-sale',
  templateUrl: './lot-sale.component.html',
  styleUrls: ['./lot-sale.component.css']
})
export class LotSaleComponent implements OnInit {
  appLanguage?: any;
  lotSaleActive:any =0;

  constructor(public globals: GlobalsService) { }

  ngOnInit(): void {
    this.language();
  }
  language(){
   
    this.appLanguage = this.globals.languageJson;
   this.lotSaleActive++;

  }
}
