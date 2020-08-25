import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-micro-roaster-stat',
  templateUrl: './micro-roaster-stat.component.html',
  styleUrls: ['./micro-roaster-stat.component.css']
})
export class MicroRoasterStatComponent implements OnInit {

  public bar=[
    {
      "name": "Mon",
      "value": 10.4,
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
