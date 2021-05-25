import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { MenuItem } from 'primeng/api';
import { GenerateReportService } from './generate-report/generate-report.service';

@Component({
    selector: 'app-green-grading',
    templateUrl: './green-grading.component.html',
    styleUrls: ['./green-grading.component.scss'],
})
export class GreenGradingComponent implements OnInit {
    items: MenuItem[];
    constructor(public globals: GlobalsService, private generateReportService: GenerateReportService) {}

    ngOnInit(): void {
        // Breadcrumb
        this.items = [
            { label: this.globals.languageJson?.home, routerLink: '/features/micro-roaster-dashboard' },
            { label: this.globals.languageJson?.menu_sourcing },
            { label: this.globals.languageJson?.green_grading },
        ];
    }

    onClickButton() {
        this.generateReportService.serviceRequestsList = [];
    }
}
