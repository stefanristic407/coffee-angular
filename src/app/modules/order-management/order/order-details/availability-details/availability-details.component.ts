import { Component, Input, OnInit } from '@angular/core';
import { BulkDetails } from '@core/models';

@Component({
    selector: 'app-availability-details',
    templateUrl: './availability-details.component.html',
    styleUrls: ['./availability-details.component.scss'],
})
export class AvailabilityDetailsComponent implements OnInit {
    @Input() bulk: BulkDetails;

    constructor() {}

    ngOnInit(): void {}
}
