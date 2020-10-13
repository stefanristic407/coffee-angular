import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-requested',
  templateUrl: './service-requested.component.html',
  styleUrls: ['./service-requested.component.css']
})
export class ServiceRequestedComponent implements OnInit {
  date6: Date;
  langChips : any = [];
  selectable = true;
  removable = true;

  constructor() { }

  ngOnInit(): void {
  }

  addLang(value:any) {
    // const input = event.input;
    // const value = event.value;
  
    // Add our fruit
    if ((value || '').trim()) {
      this.langChips.push(value.trim());
    }
  
    // // Reset the input value
    // if (input) {
    //   input.value = '';
    // }
  
  }
  
  remove(lang: string): void {
    const index = this.langChips.indexOf(lang);
  
    if (index >= 0) {
      this.langChips.splice(index, 1);
    }
  }
}
