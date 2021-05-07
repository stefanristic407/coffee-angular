import { Component, OnInit } from '@angular/core';
import { GlobalsService, RoasterserviceService } from '@services';
import { MenuItem } from 'primeng/api';
import { GenerateReportService } from './generate-report/generate-report.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-green-grading',
    templateUrl: './green-grading.component.html',
    styleUrls: ['./green-grading.component.scss'],
})
export class GreenGradingComponent implements OnInit {
    items: MenuItem[];
    isCuppingAdmin = false;
    constructor(
        public globals: GlobalsService,
        private generateReportService: GenerateReportService,
        private roasterService: RoasterserviceService,
        private cookieService: CookieService,
    ) {}

    ngOnInit(): void {
        // Breadcrumb
        this.items = [
            { label: this.globals.languageJson?.home, routerLink: '/features/micro-roaster-dashboard' },
            { label: this.globals.languageJson?.green_grading },
        ];
        this.getRoleList();
    }

    getRoleList() {
        const roasterId = this.cookieService.get('roaster_id');
        this.roasterService.getLoggedinUserRoles(roasterId).subscribe((res: any) => {
            if (res.success === true) {
                if (res.result?.find((item) => item.name === 'Cupping Admin')) {
                    this.isCuppingAdmin = true;
                }
            }
        });
    }

    onClickButton() {
        this.generateReportService.serviceRequestsList = [];
    }
}
