import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cupping-service',
  templateUrl: './cupping-service.component.html',
  styleUrls: ['./cupping-service.component.css']
})
export class CuppingServiceComponent implements OnInit {

 

  public serviceData:any[]=[
    {  evaluator: 'Leon Joseph', score: '85.23',aroma:'7', dry: '1', break: '2',flavour:'8',aftertaste:'8',acidity:'6',body:'6',balance:'10',uniformity:'10',cleanup:'10',sweetness:'10',overall:'5' },
		{  evaluator: 'Gussie Barker', score: '87.5',aroma:'7',dry: '1', break: '2',flavour:'8',aftertaste:'8',acidity:'6',body:'6',balance:'10',uniformity:'10',cleanup:'10',sweetness:'10',overall:'5'},
		{  evaluator: 'Nancy Jones', score: '86.5',aroma:'7', dry: '1', break: '2',flavour:'8',aftertaste:'8',acidity:'6',body:'6',balance:'10',uniformity:'10',cleanup:'10',sweetness:'10',overall:'5' },
		{  evaluator: 'Dale Stanley', score: '85', aroma:'7',dry: '1', break: '2',flavour:'8',aftertaste:'8',acidity:'6',body:'6',balance:'10',uniformity:'10',cleanup:'10',sweetness:'10',overall:'5'}
]
type:boolean;
  
  public bubbleData =  [
    {
      name: 'Data1',
      series: [
        {
		  name: 'Aroma',
          x: 'Aroma',
          y: 6,
          r: 40
        },
      
    {
		name: 'Dry',
          x: 'Dry',
          y: -10,
          r: 40
      },
     
    
        {
		  name: 'Break',
          x: 'Break',
          y: 2,
          r: 40
        },
    {
      
			name: 'Flavour',
          x: 'Flavour',
          y: 8,
          r: 40
        
    },
    {
     
			name: 'Aftertaste',
          x: 'Aftertaste',
          y: 7,
          r: 40
        
    },
    {
      
			name: 'Acidity',
          x: 'Acidity',
          y: -10,
          r: 40
        },
      
    {
     
			name: 'Body',
          x: 'Body',
          y: 6,
          r: 40
        
    },
    
        {
			name: 'Balance',
          x: 'Balance',
          y: 10,
          r: 40
        
    },
    {
      
			name: 'Uniformirty',
          x: 'Uniformirty',
          y: -10,
          r: 40
        
    },
    {
      
			name: 'Clean cup',
          x: 'Clean cup',
          y: -10,
          r: 40
        
    },
    {
      
			name: 'Sweetness',
          x: 'Sweetness',
          y: 10,
          r: 40
        
    },
    {
      
			name: 'Overall',
          x: 'Overall',
          y: -10,
          r: 40
        
	}
]
	},
	{
	name: 'Data2',
      series: [
        {
		  name: 'Aroma',
          x: 'Aroma',
          y: 4,
          r: 40
        },
      
    {
		name: 'Dry',
          x: 'Dry',
          y: 1,
          r: 40
      },
     
    
        {
		  name: 'Break',
          x: 'Break',
          y: -10,
          r: 40
        },
    {
      
			name: 'Flavour',
          x: 'Flavour',
          y: 2,
          r: 40
        
    },
    {
     
			name: 'Aftertaste',
          x: 'Aftertaste',
          y: 8,
          r: 40
        
    },
    {
      
			name: 'Acidity',
          x: 'Acidity',
          y: -10,
          r: 40
        },
      
    {
     
			name: 'Body',
          x: 'Body',
          y: 6,
          r: 40
        
    },
    
        {
			name: 'Balance',
          x: 'Balance',
          y: 7,
          r: 40
        
    },
    {
      
			name: 'Uniformirty',
          x: 'Uniformirty',
          y: 10,
          r: 40
        
    },
    {
      
			name: 'Clean cup',
          x: 'Clean cup',
          y: 10,
          r: 40
        
    },
    {
      
			name: 'Sweetness',
          x: 'Sweetness',
          y: -10,
          r: 40
        
    },
    {
      
			name: 'Overall',
          x: 'Overall',
          y: -10,
          r: 40
        
	}
]
}
  ];


  
  public scoreData =  [
    {
      name: 'Data1',
      series: [
        {
		  name: 'Aroma',
          x: 'Aroma',
          y: 10,
          r: 40
        },
    {
      
		name: 'Dry',
          x: 'Dry',
          y: 10,
          r: 40
        },
        {
		  name: 'Break',
          x: 'Break',
          y: 85,
          r: 40
        },
        {
			name: 'Flavour',
          x: 'Flavour',
          y: 10,
          r: 40
        },
        {
			name: 'Aftertaste',
          x: 'Aftertaste',
          y: 10,
          r: 40
        },
    {
     
			name: 'Acidity',
          x: 'Acidity',
          y: 10,
          r: 40
	},
    {
     
		name: 'Body',
          x: 'Body',
          y: 10,
          r: 40
       
    },
    {
      
			name: 'Balance',
          x: 'Balance',
          y: 10,
          r: 40
        },
    {
      
		name: 'Uniformirty',
          x: 'Uniformirty',
          y: 10,
          r: 40
        },
      
    {
     
			name: 'Clean cup',
          x: 'Clean cup',
          y: 10,
          r: 40
        },
      
    {
			name: 'Sweetness',
          x: 'Sweetness',
          y: 10,
          r: 40
        },
      
    {
     
			name: 'Overall',
          x: 'Overall',
          y: 10,
          r: 40
        }
      ]
	},
	{
		name: 'Data2',
      series: [
        {
		  name: 'Aroma',
          x: 'Aroma',
          y: 10,
          r: 40
        },
    {
      
		name: 'Dry',
          x: 'Dry',
          y: 10,
          r: 40
        },
        {
		  name: 'Break',
          x: 'Break',
          y: 76,
          r: 40
        },
        {
			name: 'Flavour',
          x: 'Flavour',
          y: 10,
          r: 40
        },
        {
			name: 'Aftertaste',
          x: 'Aftertaste',
          y: 10,
          r: 40
        },
    {
     
			name: 'Acidity',
          x: 'Acidity',
          y: 10,
          r: 40
	},
    {
     
		name: 'Body',
          x: 'Body',
          y: 10,
          r: 40
       
    },
    {
      
			name: 'Balance',
          x: 'Balance',
          y: 10,
          r: 40
        },
    {
      
		name: 'Uniformirty',
          x: 'Uniformirty',
          y: 10,
          r: 40
        },
      
    {
     
			name: 'Clean cup',
          x: 'Clean cup',
          y: 10,
          r: 40
        },
      
    {
			name: 'Sweetness',
          x: 'Sweetness',
          y: 10,
          r: 40
        },
      
    {
     
			name: 'Overall',
          x: 'Overall',
          y: 10,
          r: 40
        }
      ]
	}
  ];


  view: any[] = [825, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  minRadius: number = 5;
  yScaleMin: number = -3;
  yScaleMax: number = 10;
  colorScheme = {
    domain: ['#7c6be8','#f19634']
  };


//   viewScore: any[] = [844, 400];

  // options
  showXAxisScore: boolean = false;
  showYAxisScore: boolean = true;
  gradientScore: boolean = false;
  showLegendScore: boolean = true;
  minRadiusScore: number = 5;
  yScaleMinScore: number = 22;
  yScaleMaxScore: number = 100;
  colorSchemeScore = {
    domain: ['#7c6be8','#f19634']
  };


  constructor() {
    this.type = true;
   }

  ngOnInit(): void {
  }

}
