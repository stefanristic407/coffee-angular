import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-total-coffee-available-chart',
  templateUrl: './total-coffee-available-chart.component.html',
  styleUrls: ['./total-coffee-available-chart.component.css']
})
export class TotalCoffeeAvailableChartComponent implements OnInit {

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
