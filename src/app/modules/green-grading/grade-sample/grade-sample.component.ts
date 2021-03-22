import { Component, OnInit, HostListener } from '@angular/core';
import { GlobalsService, GreenGradingService } from '@services';
import { Router, NavigationExtras } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GenerateReportService } from '../generate-report/generate-report.service';
import { MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

import { COUNTRY_LIST } from '@constants';

@Component({
    selector: 'app-grade-sample',
    templateUrl: './grade-sample.component.html',
    styleUrls: ['./grade-sample.component.scss'],
})
export class GradeSampleComponent implements OnInit {
    breadCrumbItems: MenuItem[];
    roasterId: any;
    gradeOrigin: any;
    gradeEstate: any;
    gradeSpecies: any;
    gradeId: any;
    cuppingRequestList: any;

    selectedEstateName: any;
    selectedStatus: any;
    estateArray: any[];
    statusArray: any[];

    tableData: any[] = [];
    tableColumns: any[] = [];
    selectedRows: any[] = [];
    isMobileView = false;
    loading = false;
    term = '';

    countries: any[];
    clonedSamples: { [s: string]: any } = {};

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.initializeTable();
    }

    constructor(
        private router: Router,
        public globals: GlobalsService,
        private cookieService: CookieService,
        public generateReportService: GenerateReportService,
        private toastrService: ToastrService,
        private greenGradingService: GreenGradingService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.breadCrumbItems = [
            { label: this.globals.languageJson?.home, routerLink: '/features/micro-roaster-dashboard' },
            { label: this.globals.languageJson?.green_grading, routerLink: '/green-grading' },
            { label: this.globals.languageJson?.grade_sample },
        ];
        this.countries = COUNTRY_LIST;
        this.getExternalReports();
        this.initializeTable();
    }

    initializeTable() {
        this.isMobileView = window.innerWidth <= 767;
        this.tableColumns = [
            {
                field: 'cupping_report_id',
                header: 'ID',
                sortable: false,
            },
            {
                field: 'estate_name',
                header: 'Estate name',
                sortable: false,
            },
            {
                field: 'origin',
                header: 'Origin',
                sortable: true,
            },
            {
                field: 'variety',
                header: 'Variety',
                sortable: false,
            },
            {
                field: 'external_sample_id',
                header: 'External',
                sortable: false,
            },
        ];
    }

    onRowEditInit(sample: any) {
        this.clonedSamples[sample.cupping_report_id] = { ...sample };
    }

    onRowEditSave(sample: any) {
        delete this.clonedSamples[sample.cupping_report_id];
        const updateSample = {
            origin: sample.origin,
            estate_name: sample.estate_name,
            species: sample.species,
            sample_id: sample.external_sample_id,
        };
        this.greenGradingService
            .updateExternalSample(this.roasterId, sample.cupping_report_id, updateSample)
            .subscribe((result: any) => {
                if (result.success === true) {
                    this.toastrService.success('Micro roaster Sample Details updated successfully');
                    this.getExternalReports();
                } else {
                    this.toastrService.error('Error while updating Sample details');
                }
            });
    }

    onRowEditCancel(sample: any, index: number) {
        this.tableData[index] = this.clonedSamples[sample.cupping_report_id];
        delete this.tableData[sample.cupping_report_id];
    }

    addExternalReport() {
        if (
            this.gradeOrigin === undefined ||
            this.gradeSpecies === undefined ||
            this.gradeEstate === undefined ||
            this.gradeId === undefined
        ) {
            this.toastrService.error('Fields should not be empty.');
        } else {
            const data = {
                origin: this.gradeOrigin,
                estate_name: this.gradeEstate,
                variety: this.gradeSpecies,
                sample_id: this.gradeId,
            };
            this.greenGradingService.addExternalCuppingReport(this.roasterId, data).subscribe((res: any) => {
                if (res.success === true) {
                    this.toastrService.success('External cupping report added successfully.');
                    this.getExternalReports();
                    this.gradeOrigin = '';
                    this.gradeEstate = '';
                    this.gradeSpecies = '';
                    this.gradeId = '';
                } else {
                    this.toastrService.error('Error while adding reports.');
                }
            });
        }
    }

    getExternalReports() {
        this.estateArray = [{ name: 'All' }];
        this.statusArray = [{ name: 'All' }];
        this.loading = true;
        this.greenGradingService.listCuppingRequest(this.roasterId).subscribe((data: any) => {
            this.cuppingRequestList = data.result;
            this.tableData = this.cuppingRequestList;
            for (const cupping of this.cuppingRequestList) {
                if (!this.estateArray.find((item) => item.name === cupping.estate_name)) {
                    this.estateArray = [...this.estateArray, { name: cupping.estate_name }];
                }
                if (!this.statusArray.find((item) => item.name === cupping.status)) {
                    this.statusArray = [...this.statusArray, { name: cupping.status }];
                }
            }
            this.loading = false;
            this.selectedRows = this.generateReportService.serviceRequestsList ?? [];
        });
    }

    deleteSample(sample: any) {
        this.loading = true;
        this.greenGradingService
            .deleteExternalSample(this.roasterId, sample.cupping_report_id)
            .subscribe((result: any) => {
                if (result.success === true) {
                    this.toastrService.success('Sample deleted successfully.');
                    this.selectedRows = this.selectedRows.filter(
                        (item) => item.cupping_report_id !== sample.cupping_report_id,
                    );
                    this.getExternalReports();
                } else {
                    this.loading = false;
                    this.toastrService.error('Error while deleting VAT details');
                }
            });
    }

    generateReportLink() {
        if (this.selectedRows) {
            this.generateReportService.serviceRequestsList = this.selectedRows;
            const navigationExtras: NavigationExtras = {
                queryParams: {
                    from: 'SampleRequest',
                },
            };
            this.router.navigate(['/green-grading/generate-report'], navigationExtras);
        }
    }

    onFilter() {
        let filteredData = this.cuppingRequestList;
        filteredData = filteredData.filter((row: any) =>
            !this.selectedEstateName || this.selectedEstateName === 'All'
                ? true
                : row.estate_name === this.selectedEstateName,
        );
        filteredData = filteredData.filter((row: any) =>
            !this.selectedStatus || this.selectedStatus === 'All' ? true : row.status === this.selectedStatus,
        );
        this.tableData =
            this.term.length === 0
                ? filteredData
                : filteredData.filter((item) => item.estate_name.indexOf(this.term) >= 0);
    }
}