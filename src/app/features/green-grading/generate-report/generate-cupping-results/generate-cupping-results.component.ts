import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-generate-cupping-results',
  templateUrl: './generate-cupping-results.component.html',
  styleUrls: ['./generate-cupping-results.component.css']
})
export class GenerateCuppingResultsComponent implements OnInit {
  modalRef: BsModalRef;
  type:boolean;
  
  public bubbleData =  [
    {
      name: 'Aroma',
      series: [
        {
		  name: 'Aroma',
          x: 'Aroma',
          y: 6,
          r: 40
        }
      ]
    },
    {
      name: 'Dry',
      series: [
        {
		name: 'Dry',
          x: 'Dry',
          y: -10,
          r: 40
        }
      ]
    },
    {
      name: 'Break',
      series: [
        {
		  name: 'Break',
          x: 'Break',
          y: 2,
          r: 40
        }
      ]
    },
    {
      name: 'Flavour',
      series: [
        {
			name: 'Flavour',
          x: 'Flavour',
          y: 8,
          r: 40
        }
      ]
    },
    {
      name: 'Aftertaste',
      series: [
        {
			name: 'Aftertaste',
          x: 'Aftertaste',
          y: 7,
          r: 40
        }
      ]
    },
    {
      name: 'Acidity',
      series: [
        {
			name: 'Acidity',
          x: 'Acidity',
          y: -10,
          r: 40
        }
      ]
    },
    {
      name: 'Body',
      series: [
        {
			name: 'Body',
          x: 'Body',
          y: 6,
          r: 40
        }
      ]
    },
    {
      name: 'Balance',
      series: [
        {
			name: 'Balance',
          x: 'Balance',
          y: 10,
          r: 40
        }
      ]
    },
    {
      name: 'Uniformirty',
      series: [
        {
			name: 'Uniformirty',
          x: 'Uniformirty',
          y: -10,
          r: 40
        }
      ]
    },
    {
      name: 'Clean cup',
      series: [
        {
			name: 'Clean cup',
          x: 'Clean cup',
          y: -10,
          r: 40
        }
      ]
    },
    {
      name: 'Sweetness',
      series: [
        {
			name: 'Sweetness',
          x: 'Sweetness',
          y: 10,
          r: 40
        }
      ]
    },
    {
      name: 'Overall',
      series: [
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
      name: 'Aroma',
      series: [
        {
		  name: 'Aroma',
          x: 'Aroma',
          y: 10,
          r: 40
        }
      ]
    },
    {
      name: 'Dry',
      series: [
        {
		name: 'Dry',
          x: 'Dry',
          y: 10,
          r: 40
        }
      ]
    },
    {
      name: 'Break',
      series: [
        {
		  name: 'Break',
          x: 'Break',
          y: 85,
          r: 40
        }
      ]
    },
    {
      name: 'Flavour',
      series: [
        {
			name: 'Flavour',
          x: 'Flavour',
          y: 10,
          r: 40
        }
      ]
    },
    {
      name: 'Aftertaste',
      series: [
        {
			name: 'Aftertaste',
          x: 'Aftertaste',
          y: 10,
          r: 40
        }
      ]
    },
    {
      name: 'Acidity',
      series: [
        {
			name: 'Acidity',
          x: 'Acidity',
          y: 10,
          r: 40
        }
      ]
    },
    {
      name: 'Body',
      series: [
        {
			name: 'Body',
          x: 'Body',
          y: 50,
          r: 40
        }
      ]
    },
    {
      name: 'Balance',
      series: [
        {
			name: 'Balance',
          x: 'Balance',
          y: 10,
          r: 40
        }
      ]
    },
    {
      name: 'Uniformirty',
      series: [
        {
			name: 'Uniformirty',
          x: 'Uniformirty',
          y: 10,
          r: 40
        }
      ]
    },
    {
      name: 'Clean cup',
      series: [
        {
			name: 'Clean cup',
          x: 'Clean cup',
          y: 10,
          r: 40
        }
      ]
    },
    {
      name: 'Sweetness',
      series: [
        {
			name: 'Sweetness',
          x: 'Sweetness',
          y: 10,
          r: 40
        }
      ]
    },
    {
      name: 'Overall',
      series: [
        {
			name: 'Overall',
          x: 'Overall',
          y: 10,
          r: 40
        }
      ]
    }
  ];


  view: any[] = [750, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  minRadius: number = 5;
  yScaleMin: number = -3;
  yScaleMax: number = 10;
  colorScheme = {
    domain: ['#7c6be8']
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
    domain: ['#f19634']
  };


  constructor(private modalService: BsModalService) {
    this.type = true;
   }

   @ViewChild('confirmtemplate') private confirmtemplate: any;

openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);

}

  ngOnInit(): void {
  }
submit(){
  this.openModal(this.confirmtemplate);
}
}
