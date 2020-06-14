import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-raised-ticket',
	templateUrl: './raised-ticket.component.html',
	styleUrls: ['./raised-ticket.component.css']
})
export class RaisedTicketComponent implements OnInit {
	term: any;

	public data: any[] = [
		{ orderid: '81671', estatename: 'Finca La Pampa', dateraised: '24 Jan 2020', disputetype: 'Payment', status: 'Open' },
		{ orderid: '56076', estatename: 'Gesha', dateraised: '21 Jan 2020', disputetype: 'Getting Started', status: 'Resolved' },
		{ orderid: '46930', estatename: 'Finca La Toboba', dateraised: '22 Apr 2020', disputetype: 'Requesting Sample', status: 'Resolved' },
		{ orderid: '9019', estatename: 'Asoproaaa', dateraised: '24 Apr 2020', disputetype: 'Shipping', status: 'Escalated' },
		{ orderid: '12416', estatename: 'Cafe Directo', dateraised: '25 May 2020', disputetype: 'Payment', status: 'Resolved' },
		{ orderid: '71716', estatename: 'La Isabela', dateraised: '26 May 2020', disputetype: 'Legal', status: 'Open' }
	];
	constructor() { }

	ngOnInit(): void {
	}

}
