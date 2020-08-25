import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coustomer-wants-chart',
  templateUrl: './coustomer-wants-chart.component.html',
  styleUrls: ['./coustomer-wants-chart.component.css']
})
export class CoustomerWantsChartComponent implements OnInit {

  public single = [
    {
      "name": "12% increase past 7 days",
      "value": 3456
    }
  ];


//  single: any[];
  view: any[] = [400, 350];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
    domain: ['#232334']
  };

  constructor() {
    // Object.assign(this, { single });
  }

  ngOnInit(): void {
    
    
  }

  onSelect(event) {
    console.log(event);
  }


}
