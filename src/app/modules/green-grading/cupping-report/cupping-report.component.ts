import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { COUNTRY_LIST } from '@constants';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, GreenGradingService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { GenerateReportService } from '../generate-report/generate-report.service';

@Component({
    selector: 'app-cupping-report',
    templateUrl: './cupping-report.component.html',
    styleUrls: ['./cupping-report.component.scss'],
})
export class CuppingReportComponent implements OnInit {
    breadCrumbItems: MenuItem[];
    roasterId: any;
    term = '';
    calendar: any;
    countries: any[];
    selectedOrigin: any;
    selectedDate: any;

    regions: any[] = [];
    selectedRegion: any;

    tableData: any[] = [];
    tableColumns: any[] = [];
    selectedRows: any[] = [];
    isMobileView = false;
    isMiddleView = false;
    loading = false;
    activeIndex = 0;

    serviceReportsData: any[];
    otherReportsData: any[];

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.initializeTable();
    }

    constructor(
        public generateReportService: GenerateReportService,
        private toastrService: ToastrService,
        private primengConfig: PrimeNGConfig,
        private router: Router,
        private greenGradingService: GreenGradingService,
        private authService: AuthService,
        private translateService: TranslateService,
    ) {
        this.roasterId = this.authService.getOrgId();
    }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        this.breadCrumbItems = [
            { label: this.translateService.instant('home'), routerLink: '/' },
            { label: this.translateService.instant('menu_sourcing') },
            { label: this.translateService.instant('quality_control'), routerLink: '/green-grading' },
            { label: this.translateService.instant('my_cupping_reports') },
        ];
        this.countries = COUNTRY_LIST;
        this.getReportsData();
        this.initializeTable();
    }

    initializeTable() {
        this.isMobileView = window.innerWidth <= 767;
        this.isMiddleView = window.innerWidth > 767 && window.innerWidth <= 1024;
        this.tableColumns = [
            {
                field: 'cupping_report_id',
                header: 'service_id',
            },
            {
                field: 'estate_name',
                header: 'estate_name',
            },
            {
                field: 'region',
                header: 'region',
            },
            {
                field: 'evaluators',
                header: 'evaluators',
            },
            {
                field: 'completed_on',
                header: 'date_conducted',
            },
            {
                field: 'average_score',
                header: 'avg_cup_score',
            },
        ];
    }

    getReportsData() {
        this.greenGradingService.listCuppingReports(this.roasterId).subscribe((res: any) => {
            if (res.success === true) {
                this.serviceReportsData = res.result;
                this.tableData = res.result;
                this.regions = [];
                for (const request of res.result) {
                    if (!this.regions.find((item) => item.value === request.region)) {
                        this.regions = [...this.regions, { value: request.region, label: request.region }];
                    }
                }
            } else {
                this.toastrService.error('Error while listing service Reports.');
            }
        });
        this.greenGradingService.externalCuppingReportsList(this.roasterId).subscribe((res: any) => {
            if (res.success === true) {
                this.otherReportsData = res.result;
            } else {
                this.toastrService.error('Error while listing Other Reports.');
            }
        });
    }

    handleTabChange(item) {
        this.activeIndex = item.index;
        if (item.index === 0) {
            this.tableData = this.serviceReportsData;
            this.tableColumns = [
                {
                    field: 'cupping_report_id',
                    header: 'service_id',
                },
                {
                    field: 'estate_name',
                    header: 'estate_name',
                },
                {
                    field: 'region',
                    header: 'region',
                },
                {
                    field: 'evaluators',
                    header: 'evaluators',
                },
                {
                    field: 'completed_on',
                    header: 'date_conducted',
                },
                {
                    field: 'average_score',
                    header: 'avg_cup_score',
                },
            ];
        } else {
            this.tableData = this.otherReportsData;
            this.tableColumns = [
                {
                    field: 'external_sample_id',
                    header: 'ID',
                },
                {
                    field: 'estate_name',
                    header: 'estate_name',
                },
                {
                    field: 'origin',
                    header: 'origin',
                },
                {
                    field: 'completed_on',
                    header: 'date_conducted',
                },
                {
                    field: 'average_score',
                    header: 'cup_score',
                },
            ];
        }
    }

    onFilter() {
        let reportsData = this.activeIndex === 0 ? this.serviceReportsData : this.otherReportsData;
        reportsData = reportsData.filter((row: any) =>
            this.selectedDate ? new Date(row.completed_on) <= new Date(this.selectedDate) : true,
        );
        if (this.activeIndex === 0) {
            reportsData = reportsData.filter((row: any) =>
                !this.selectedRegion || this.selectedRegion === 'all' ? true : row.region === this.selectedRegion,
            );
        } else {
            reportsData = reportsData.filter((row: any) =>
                !this.selectedOrigin || this.selectedOrigin === 'all' ? true : row.origin === this.selectedOrigin,
            );
        }
        this.tableData =
            this.term.length === 0
                ? reportsData
                : reportsData.filter(
                      (item) =>
                          item.estate_name.toLowerCase().indexOf(this.term.toLowerCase()) >= 0 ||
                          (this.activeIndex === 0 ? item.cupping_report_id : item.external_sample_id)
                              .toString()
                              .indexOf(this.term) >= 0,
                  );
    }

    serviceReportLink(data: any) {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                serviceId: this.activeIndex === 0 ? data.gc_order_id : data.external_sample_id,
                cuppingReportId: data.cupping_report_id,
                requestType: this.activeIndex === 0 ? 'serviceRequest' : 'otherRequest',
            },
        };
        this.router.navigate([`/green-grading/cupping-service`], navigationExtras);
    }

    viewPdf(data: any) {
        const a = document.createElement('a');
        a.href = data;
        a.target = '_blank';
        a.click();
    }

    reGrade(item) {
        if (this.activeIndex === 0) {
            this.greenGradingService.recupSample(this.roasterId, item.gc_order_id).subscribe((res: any) => {
                if (res.success) {
                    this.toastrService.success('Recupping has started');
                    this.router.navigate(['/green-grading/green-coffee-orders'], {
                        queryParams: {
                            cuppingReportId: res.result.id,
                        },
                    });
                } else {
                    this.toastrService.error('Error while downloading report');
                }
            });
        } else {
            this.greenGradingService
                .recupSampleRequest(this.roasterId, item.external_sample_id)
                .subscribe((res: any) => {
                    if (res.success) {
                        this.toastrService.success('Recupping has started');
                        this.router.navigate(['/green-grading/grade-sample'], {
                            queryParams: {
                                cuppingReportId: res.result.id,
                            },
                        });
                    } else {
                        this.toastrService.error('Error while downloading report');
                    }
                });
        }
    }

    getMenuItemsForItem(item) {
        const items = [
            {
                label: 'View table',
                command: () => {
                    this.serviceReportLink(item);
                },
            },
            {
                label: 'View PDF',
                command: () => {
                    this.viewPdf(item.url);
                },
            },
            {
                label: 'Download PDF',
                command: () => {
                    this.downloadFile(item);
                },
            },
            {
                label: 'Re-cup sample',
                command: () => {
                    this.reGrade(item);
                },
            },
        ];
        return [{ items }];
    }

    downloadFile(item: any) {
        const a = document.createElement('a');
        a.href = item.url;
        a.download = 'Report' + '.pdf';
        a.target = '_blank';
        a.click();
    }
}
