import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'app-coffee-sale',
  templateUrl: './coffee-sale.component.html',
  styleUrls: ['./coffee-sale.component.css']
})
export class CoffeeSaleComponent implements OnInit {
  appLanguage: any;

  constructor(private globals: GlobalsService) { }

  ngOnInit(): void {
    this.appLanguage = this.globals.languageJson;
  }

}
