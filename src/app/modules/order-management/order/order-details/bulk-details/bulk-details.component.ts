import { Component, Input, OnInit } from '@angular/core';
import { BulkDetails, OrderDetails } from '@models';

@Component({
    selector: 'app-bulk-details',
    templateUrl: './bulk-details.component.html',
    styleUrls: ['./bulk-details.component.scss'],
})
export class BulkDetailsComponent implements OnInit {
    @Input() bulk: BulkDetails;

    constructor() {}

    ngOnInit(): void {}
}
