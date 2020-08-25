import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-orders-all-stat',
  templateUrl: './sales-orders-all-stat.component.html',
  styleUrls: ['./sales-orders-all-stat.component.css']
})
export class SalesOrdersAllStatComponent implements OnInit {

  public bar=[
    {
      "name": "Mon",
      "value": 22.4,
    },
    {
      "name": "Tue",
      "value": 10,
    },
    {
      "name": "Web",
      "value": 5,
    },
    {
      "name": "Thu",
      "value": 3,
    },
    {
      "name": "Fri",
      "value":2.3,
    },
     {
      "name": "Sat",
      "value": 3,
    },
    {
      "name": "Sun",
      "value":7,
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
