import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { COUNTRY_LIST } from '@constants';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, GreenGradingService } from '@services';
import { getCountry } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { MenuItem, SortEvent } from 'primeng/api';
import { GenerateReportService } from '../generate-report/generate-report.service';

@Component({
    selector: 'app-grade-sample',
    templateUrl: './grade-sample.component.html',
    styleUrls: ['./grade-sample.component.scss'],
})
export class GradeSampleComponent implements OnInit {
    breadCrumbItems: MenuItem[];
    roasterId: any;
    cuppingRequestList: any;
    sampleDetailForm: FormGroup;
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
    selectedCuppingReportId: any;

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.initializeTable();
    }

    constructor(
        private activeRoute: ActivatedRoute,
        private authService: AuthService,
        private fb: FormBuilder,
        private greenGradingService: GreenGradingService,
        private router: Router,
        private toastrService: ToastrService,
        private translateService: TranslateService,
        public generateReportService: GenerateReportService,
    ) {
        this.roasterId = this.authService.getOrgId();
    }

    ngOnInit(): void {
        this.activeRoute.queryParams.subscribe((params) => {
            this.selectedCuppingReportId = params.cuppingReportId;
        });
        this.sampleDetailForm = this.fb.group({
            origin: ['', Validators.compose([Validators.required])],
            estateName: ['', Validators.compose([Validators.required])],
            variety: ['', Validators.compose([Validators.required])],
            sampleId: ['', Validators.compose([Validators.required])],
        });
        this.breadCrumbItems = [
            { label: this.translateService.instant('home'), routerLink: '/' },
            { label: this.translateService.instant('menu_sourcing') },
            { label: this.translateService.instant('quality_control'), routerLink: '/green-grading' },
            { label: this.translateService.instant('score_sample') },
        ];
        this.countries = COUNTRY_LIST;
        this.getExternalReports();
        this.initializeTable();
    }

    initializeTable() {
        this.isMobileView = window.innerWidth <= 767;
        this.tableColumns = [
            {
                field: 'external_sample_id',
                header: 'ID',
                sortable: false,
            },
            {
                field: 'estate_name',
                header: 'Estate name',
                sortable: true,
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
                field: 'date_requested',
                header: 'Date',
                sortable: true,
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
        this.sampleDetailForm.markAllAsTouched();
        if (this.sampleDetailForm.invalid) {
            this.toastrService.error('Fields should not be empty.');
        } else {
            const data = {
                origin: this.sampleDetailForm.get('origin').value,
                estate_name: this.sampleDetailForm.get('estateName').value,
                variety: this.sampleDetailForm.get('variety').value,
                sample_id: this.sampleDetailForm.get('sampleId').value,
            };
            this.greenGradingService.addExternalCuppingReport(this.roasterId, data).subscribe((res: any) => {
                if (res.success === true) {
                    this.toastrService.success('External cupping report added successfully.');
                    this.getExternalReports();
                    this.sampleDetailForm.reset();
                } else {
                    this.toastrService.error('Error while adding reports.');
                }
            });
        }
    }

    getExternalReports() {
        this.estateArray = [];
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
            if (this.selectedCuppingReportId) {
                this.generateReportService.serviceRequestsList = this.cuppingRequestList.find(
                    (item) => item.cupping_report_id === +this.selectedCuppingReportId,
                );
            }
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
                : filteredData.filter(
                      (item) =>
                          item.estate_name.toLowerCase().indexOf(this.term.toLowerCase()) >= 0 ||
                          item.external_sample_id.toString().indexOf(this.term.toLowerCase()) >= 0,
                  );
    }

    customSort(event: SortEvent) {
        event.data.sort((data1, data2) => {
            const value1 = getCountry(data1[event.field]) ? getCountry(data1[event.field]).name : data1[event.field];
            const value2 = getCountry(data2[event.field]) ? getCountry(data2[event.field]).name : data2[event.field];
            const result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
            return event.order * result;
        });
    }
}
