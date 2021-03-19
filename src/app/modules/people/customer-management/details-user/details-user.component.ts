import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../customer-service.service';

@Component({
    selector: 'app-details-user',
    templateUrl: './details-user.component.html',
    styleUrls: ['./details-user.component.scss'],
})
export class DetailsUserComponent implements OnInit {
    constructor(public customerService: CustomerServiceService) {}

    ngOnInit(): void {}
}
