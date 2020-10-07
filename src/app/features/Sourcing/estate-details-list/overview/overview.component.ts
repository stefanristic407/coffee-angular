import { Component, OnInit } from '@angular/core';
import {GlobalsService} from 'src/services/globals.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
appLanguage: any;

  public multi = [

		{
			"name": "Legend1",
			"series": [
			  {
				  "name": "27",
				  "value": 10
				},
				{
				  "name": "28",
				  "value": 8
				},
				{
				  "name": "1",
				  "value": 12
				},
				{
				  "name": "2",
				  "value": 19
				},
				{
				  "name": "3",
				  "value": 16
				},
				{
				  "name": "4",
				  "value": 11
				},
				{
				  "name": "5",
				  "value": 13
				},{
				  "name": "6",
				  "value": 23
				},{
				  "name": "7",
				  "value": 18
				},
				{
				  "name": "8",
				  "value": 18
				},
				{
					"name": "9",
					"value": 17
				  },{
					"name": "10",
					"value": 18
				  },{
					"name": "11",
					"value": 13
				  },
				  {
					"name": "12",
					"value": 17
				  },
				  {
					"name": "13",
					"value": 12
				  },
				  {
					"name": "14",
					"value": 10
				  }
			]
		  },
		{
		  "name": "Legend2",
		  "series": [
			{
			  "name": "27",
			  "value": 7
			},
			{
			  "name": "28",
			  "value": 2
			},
			{
			  "name": "1",
			  "value": 4
			},
			{
			  "name": "2",
			  "value": 9
			},
			{
			  "name": "3",
			  "value": 7
			},
			{
			  "name": "4",
			  "value": 3
			},
			{
			  "name": "5",
			  "value": 20
			},{
			  "name": "6",
			  "value": 15
			},{
			  "name": "7",
			  "value": 10
			},
			{
			  "name": "8",
			  "value": 15
			}
			,
			{
				"name": "9",
				"value": 13
			  },{
				"name": "10",
				"value": 13
			  },{
				"name": "11",
				"value": 10
			  },
			  {
				"name": "12",
				"value": 8
			  },
			  {
				"name": "13",
				"value": 7
			  },
			  {
				"name": "14",
				"value": 9
			  }
		  ]
		}];
	  
	  

    view: any[] = [1080, 340];

    // options for the chart
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = '';
    showYAxisLabel = true;
    yAxisLabel = 'Temperature (°C)';
    timeline = true;
    roundDomains = true;
  
    colorScheme = {
      domain: ['#f19634','#7c6be8']
    };
  
    // line, area
    autoScale = true;
      
  constructor(private globals: GlobalsService) { }

  ngOnInit(): void {
	this.appLanguage = this.globals.languageJson;
  }

}
