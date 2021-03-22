import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GlobalsService, GreenGradingService } from '@services';
import { GenerateReportService } from '../generate-report/generate-report.service';
import { MenuItem, SelectItemGroup, PrimeNGConfig } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

import { COUNTRY_LIST } from '@constants';

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

    regions: SelectItemGroup[];
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
        public globals: GlobalsService,
        public generateReportService: GenerateReportService,
        private cookieService: CookieService,
        private toastrService: ToastrService,
        private primengConfig: PrimeNGConfig,
        private router: Router,
        private greenGradingService: GreenGradingService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        this.breadCrumbItems = [
            { label: this.globals.languageJson?.home, routerLink: '/features/micro-roaster-dashboard' },
            { label: this.globals.languageJson?.green_grading, routerLink: '/green-grading' },
            { label: this.globals.languageJson?.my_cupping_reports },
        ];
        this.countries = COUNTRY_LIST;
        this.regions = [];
        for (const country of COUNTRY_LIST) {
            const groupItem = {
                label: country.name,
                value: country.isoCode,
                items: country.cities.map((item: any) => {
                    return {
                        label: item,
                        value: item,
                    };
                }),
            };
            this.regions.push(groupItem);
        }
        this.getReportsData();
        this.initializeTable();
    }

    initializeTable() {
        this.isMobileView = window.innerWidth <= 767;
        this.isMiddleView = window.innerWidth > 767 && window.innerWidth <= 1024;
        this.tableColumns = [
            {
                field: 'cupping_report_id',
                header: this.globals.languageJson?.service_id,
                sortable: false,
            },
            {
                field: 'estate_name',
                header: this.globals.languageJson?.estate_name,
                sortable: false,
            },
            {
                field: 'region',
                header: this.globals.languageJson?.region,
                sortable: false,
            },
            {
                field: 'evaluators',
                header: this.globals.languageJson?.evaluators,
                sortable: false,
            },
            {
                field: 'completed_on',
                header: this.globals.languageJson?.date_conducted,
                sortable: false,
            },
            {
                field: 'average_score',
                header: this.globals.languageJson?.avg_cup_score,
                sortable: false,
            },
        ];
    }

    getReportsData() {
        this.greenGradingService.listCuppingReports(this.roasterId).subscribe((res: any) => {
            if (res.success === true) {
                this.serviceReportsData = res.result;
                this.tableData = res.result;
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
                    header: this.globals.languageJson?.service_id,
                    sortable: false,
                },
                {
                    field: 'estate_name',
                    header: this.globals.languageJson?.estate_name,
                    sortable: false,
                },
                {
                    field: 'region',
                    header: this.globals.languageJson?.region,
                    sortable: false,
                },
                {
                    field: 'evaluators',
                    header: this.globals.languageJson?.evaluators,
                    sortable: false,
                },
                {
                    field: 'completed_on',
                    header: this.globals.languageJson?.date_conducted,
                    sortable: false,
                },
                {
                    field: 'average_score',
                    header: this.globals.languageJson?.avg_cup_score,
                    sortable: false,
                },
            ];
        } else {
            this.tableData = this.otherReportsData;
            this.tableColumns = [
                {
                    field: 'cupping_report_id',
                    header: 'ID',
                    sortable: false,
                },
                {
                    field: 'estate_name',
                    header: this.globals.languageJson?.estate_name,
                    sortable: false,
                },
                {
                    field: 'origin',
                    header: this.globals.languageJson?.origin,
                    sortable: false,
                },
                {
                    field: 'completed_on',
                    header: this.globals.languageJson?.date_conducted,
                    sortable: false,
                },
                {
                    field: 'average_score',
                    header: 'Cup Score',
                    sortable: false,
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
                : reportsData.filter((item) => item.estate_name.indexOf(this.term) >= 0);
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

    downloadFile(item: any) {
        const a = document.createElement('a');
        a.href = item;
        a.download = 'Report' + '.pdf';
        a.target = '_blank';
        a.click();
    }

    reGrade(item) {
        if (this.activeIndex === 0) {
            this.greenGradingService.recupSample(this.roasterId, item.gc_order_id).subscribe((res: any) => {
                if (res.success === true) {
                    this.toastrService.success('Recupping has started');
                } else {
                    this.toastrService.error('Error while downloading report');
                }
            });
        } else {
            this.greenGradingService
                .recupSampleRequest(this.roasterId, item.external_sample_id)
                .subscribe((res: any) => {
                    if (res.success === true) {
                        this.toastrService.success('Recupping has started');
                    } else {
                        this.toastrService.error('Error while downloading report');
                    }
                });
        }
    }

    evaluatorsList(item) {
        this.greenGradingService
            .getEvaluatorsList(this.roasterId, item.cupping_report_id)
            .subscribe((response: any) => {
                if (response.success === true) {
                    this.uploadReport(item, response.result);
                }
            });
    }

    uploadReport(item, evaluatorArray) {
        const ids = evaluatorArray.map((ele: any) => ele.evaluator_id);
        const data = {
            status: 'COMPLETED',
            evaluator_ids: ids,
        };
        this.greenGradingService.updateStatus(this.roasterId, item.cupping_report_id, data).subscribe((res: any) => {
            if (res.success === true) {
                this.toastrService.success('The Report has been updated.');
            } else {
                this.toastrService.error('Error while updating the report');
            }
        });
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
                    this.downloadFile(item.url);
                },
            },
            {
                label: 'Re-cup sample',
                command: () => {
                    this.reGrade(item);
                },
            },
            {
                label: 'Generate new report',
                command: () => {
                    this.evaluatorsList(item);
                },
            },
        ];

        if (this.activeIndex === 1) {
            items.splice(3, 1);
        }
        return [{ items }];
    }
}