import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-e-commerce-stat',
  templateUrl: './e-commerce-stat.component.html',
  styleUrls: ['./e-commerce-stat.component.css']
})
export class ECommerceStatComponent implements OnInit {

  public bar=[
    {
      "name": "Mon",
      "value": 12,
    },
    {
      "name": "Tue",
      "value": 10,
    },
    {
      "name": "Web",
      "value": 8,
    },
    {
      "name": "Thu",
      "value": 4,
    },
    {
      "name": "Fri",
      "value":2,
    },
     {
      "name": "Sat",
      "value": 6,
    },
    {
      "name": "Sun",
      "value":9,
    }
  ]
  
  view: any[] = [700, 220];
  
  // options
  showXAxis: boolean = true;
  gradient: boolean = true;
  showDataLabel:boolean = true;
  barPadding:number = 70;
  yAxisLabel = 'ton';
  showYAxisLabel = true;
  colorScheme = {
    domain: ["#232334"]
  };
  
  
    constructor() { 
  
      
    }
  
    ngOnInit(): void {
      
      
    }
    myYAxisTickFormatting(value :any) {
      return  value + "ton";
    }
    
  
}
