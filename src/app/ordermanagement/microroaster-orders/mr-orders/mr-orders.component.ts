import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '@services';

@Component({
    selector: 'app-mr-orders',
    templateUrl: './mr-orders.component.html',
    styleUrls: ['./mr-orders.component.css'],
})
export class MrOrdersComponent implements OnInit {
    constructor(public globals: GlobalsService) {}

    ngOnInit(): void {}
}
