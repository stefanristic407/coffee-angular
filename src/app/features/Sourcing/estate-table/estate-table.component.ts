import { Component, OnInit } from '@angular/core';
import { SourcingService } from '../sourcing.service';

@Component({
  selector: 'app-estate-table',
  templateUrl: './estate-table.component.html',
  styleUrls: ['./estate-table.component.css']
})
export class EstateTableComponent implements OnInit {


public data: any[] = [
		{  estatename: 'Finca La Pampa', rating: '4.45',origin:'Colombia', range: '980-1100m', cropyear: 'March - June',certificates:'3' },
		{  estatename: 'Gesha', rating: '4.45',origin:'Colombia', range: '1500-1700m', cropyear: 'Jan - March',certificates:'2' },
		{  estatename: 'Finca La Toboba', rating: '4.2',origin:'Ethopia', range: '1300-1400m', cropyear: 'August - Dec',certificates:'1' },
		{  estatename: 'Asoproaaa', rating: '4.9', origin:'Brazil',range: '1000-1250m', cropyear: 'March - June',certificates:'1' },
		{  estatename: 'Cafe Directo', rating: '4.6', origin:'Ethopia',range: '1500-1700m', cropyear: 'August - Dec',certificates:'2' },
		{  estatename: 'La Isabela', rating: '4.1',origin:'Colombia', range: '980-1100m', cropyear: 'Jan - March',certificates:'3' }
	];
  constructor(public sourcingService:SourcingService) { }

  ngOnInit(): void {
  }

}
