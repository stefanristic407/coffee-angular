import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { COUNTRY_LIST } from '@constants';
import { Download } from '@models';
import { TranslateService } from '@ngx-translate/core';
import { DownloadService, GreenGradingService, ResizeService } from '@services';
import { trackFileName } from '@utils';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-cupping-report',
    templateUrl: './cupping-report.component.html',
    styleUrls: ['./cupping-report.component.scss'],
})
export class CuppingReportComponent extends ResizeableComponent implements OnInit {
    readonly COUNTRY_LIST = COUNTRY_LIST;
    breadCrumbItems: MenuItem[];
    term = '';
    selectedOrigin: any;
    selectedDate: any;

    regions: any[] = [];
    selectedRegion: any;

    tableData: any[] = [];
    tableColumns: any[] = [];
    selectedRows: any[] = [];
    loading = false;
    activeIndex = 0;

    serviceReportsData: any[];
    otherReportsData: any[];

    constructor(
        private downloadService: DownloadService,
        private greenGradingService: GreenGradingService,
        private router: Router,
        private toastrService: ToastrService,
        private translator: TranslateService,
        protected resizeService: ResizeService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.breadCrumbItems = [
            { label: this.translator.instant('home'), routerLink: '/' },
            { label: this.translator.instant('menu_sourcing') },
            { label: this.translator.instant('quality_control'), routerLink: '/green-grading' },
            { label: this.translator.instant('my_cupping_reports') },
        ];
        this.getReportsData();
        this.handleTabChange();
    }

    getReportsData() {
        this.greenGradingService.listCuppingReports().subscribe((res) => {
            if (res.success) {
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
        this.greenGradingService.externalCuppingReportsList().subscribe((res) => {
            if (res.success) {
                this.otherReportsData = res.result;
            } else {
                this.toastrService.error('Error while listing Other Reports.');
            }
        });
    }

    handleTabChange(index: number = 0) {
        this.activeIndex = index;
        if (this.activeIndex === 0) {
            this.tableData = this.serviceReportsData;
            this.tableColumns = [
                {
                    field: 'cupping_report_id',
                    header: 'service_id',
                    width: 10,
                },
                {
                    field: 'estate_name',
                    header: 'estate_name',
                    width: 15,
                },
                {
                    field: 'region',
                    header: 'region',
                    width: 11,
                },
                {
                    field: 'evaluators',
                    header: 'evaluators',
                    width: 12,
                },
                {
                    field: 'completed_on',
                    header: 'date_conducted',
                    width: 15,
                },
                {
                    field: 'average_score',
                    header: 'avg_cup_score',
                    width: 12,
                },
                this.resizeService.isMobile()
                    ? null
                    : {
                          field: 'actions',
                          header: 'action',
                          width: 25,
                      },
            ].filter(Boolean);
        } else {
            this.tableData = this.otherReportsData;
            this.tableColumns = [
                {
                    field: 'external_sample_id',
                    header: 'ID',
                    width: 10,
                },
                {
                    field: 'estate_name',
                    header: 'estate_name',
                    width: 20,
                },
                {
                    field: 'origin',
                    header: 'origin',
                    width: 15,
                },
                {
                    field: 'completed_on',
                    header: 'date_conducted',
                    width: 18,
                },
                {
                    field: 'average_score',
                    header: 'cup_score',
                    width: 12,
                },
                this.resizeService.isMobile()
                    ? null
                    : {
                          field: 'actions',
                          header: 'action',
                          width: 25,
                      },
            ].filter(Boolean);
        }
    }

    onFilter() {
        let reportsData = this.activeIndex === 0 ? this.serviceReportsData : this.otherReportsData;
        reportsData = reportsData.filter(
            (row: any) =>
                (this.selectedDate && this.selectedDate[0]
                    ? new Date(row.completed_on) >= new Date(this.selectedDate[0])
                    : true) &&
                (this.selectedDate && this.selectedDate[1]
                    ? new Date(row.completed_on) <= moment(this.selectedDate[1]).startOf('day').add(1, 'day').toDate()
                    : true),
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
            this.greenGradingService.recupSample(item.gc_order_id).subscribe((res) => {
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
            this.greenGradingService.recupSampleRequest(item.external_sample_id).subscribe((res) => {
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
        return [
            { label: 'View table', command: () => this.serviceReportLink(item) },
            { label: 'View PDF', command: () => this.viewPdf(item.url) },
            { label: 'Download PDF', command: () => this.downloadFile(item) },
            { label: 'Re-cup sample', command: () => this.reGrade(item) },
        ];
    }

    downloadFile(item: any) {
        this.downloadService.download(item.url, trackFileName(item.url), 'application/pdf').subscribe(
            (res: Download) => {
                if (res?.state === 'DONE') {
                    this.toastrService.success('Downloaded successfully');
                }
            },
            (error) => {
                this.toastrService.error('Download failed');
            },
        );
    }
}
