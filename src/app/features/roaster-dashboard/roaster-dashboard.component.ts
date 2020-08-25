import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roaster-dashboard',
  templateUrl: './roaster-dashboard.component.html',
  styleUrls: ['./roaster-dashboard.component.css']
})
export class RoasterDashboardComponent implements OnInit {

  totalstar = 5;
  reviewvalue: any = 4;

  public bar=[
    {
      "name": "Brazil",
      "value": 12,
    },
    {
      "name": "Euthopia",
      "value": 10,
    },
    {
      "name": "Egypt",
      "value": 5,
    },
    {
      "name": "Yemen",
      "value": 3,
    },
    {
      "name": "Spain",
      "value":2.3,
    }
  ]
  
  view: any[] = [400, 220];
  
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
