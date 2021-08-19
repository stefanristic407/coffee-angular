import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { GenerateReportService } from './generate-report/generate-report.service';

@Component({
    selector: 'app-green-grading',
    templateUrl: './green-grading.component.html',
    styleUrls: ['./green-grading.component.scss'],
})
export class GreenGradingComponent implements OnInit {
    items: MenuItem[];
    constructor(private translateService: TranslateService, private generateReportService: GenerateReportService) {}

    ngOnInit(): void {
        // Breadcrumb
        this.items = [
            { label: this.translateService.instant('home'), routerLink: '/' },
            { label: this.translateService.instant('menu_sourcing') },
            { label: this.translateService.instant('quality_control') },
        ];
    }

    onClickButton() {
        this.generateReportService.serviceRequestsList = [];
    }
}
