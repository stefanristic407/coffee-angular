import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '@services';

@Component({
    selector: 'app-dashboard-experience',
    templateUrl: './dashboard-experience.component.html',
    styleUrls: ['./dashboard-experience.component.scss'],
})
export class DashboardExperienceComponent implements OnInit {
    constructor(public globals: GlobalsService) {}

    ngOnInit(): void {}
}
