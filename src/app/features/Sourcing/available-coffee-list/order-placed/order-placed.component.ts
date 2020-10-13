import { Component, OnInit } from '@angular/core';
import {GlobalsService} from 'src/services/globals.service';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.css']
})
export class OrderPlacedComponent implements OnInit {
  appLanguage: any;
  availableOrderActive:any=0;

  constructor(private globals: GlobalsService) { }

  ngOnInit(): void {
    this.language();  
  }
  language(){
    this.appLanguage = this.globals.languageJson;
    this.availableOrderActive++;
  }
}
