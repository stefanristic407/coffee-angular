import { Component, OnInit, OnChanges, Output, Input, EventEmitter, HostListener } from '@angular/core';
import { AuthService, GreenGradingService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmComponent } from '@shared';
import { GenerateReportService } from '../generate-report.service';

@Component({
    selector: 'app-generate-cupping-results',
    templateUrl: './generate-cupping-results.component.html',
    styleUrls: ['./generate-cupping-results.component.scss'],
})
export class GenerateCuppingResultsComponent implements OnInit, OnChanges {
    type: boolean;
    @Output() next = new EventEmitter<any>();
    @Output() handleChangeCuppingVersion = new EventEmitter<any>();
    @Input() cuppingDetails;

    roasterId: number;
    cuppingReportId: any;
    evaluatorsList: any;
    serviceRequestId: any;
    selectedEvaluators: any[] = [];
    sampleRequestId: any;
    mobileTableData: any[] = [];
    isMobileView = false;
    tableRecords: any[] = [];
    allColumns: any[];
    singleCuppingDetails: any;
    cuppingReports: any[];
    selectedCuppingVersion: any;

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.initializeTable();
    }

    constructor(
        private authService: AuthService,
        private cookieService: CookieService,
        private generateReportService: GenerateReportService,
        private greenGradingService: GreenGradingService,
        private router: Router,
        private toastrService: ToastrService,
        public dialogSrv: DialogService,
    ) {
        this.type = true;
        this.roasterId = this.authService.getOrgId();
    }

    ngOnInit(): void {
        this.initializeTable();
    }

    initializeTable() {
        this.isMobileView = window.innerWidth <= 767;
        this.allColumns = [
            {
                field: 'evaluator_name',
                header: 'Evaluator',
                width: 100,
            },
            {
                field: 'final_score',
                header: 'Final Score',
            },
            {
                field: 'fragrance_score',
                header: 'Fragrance/\nAroma',
                width: 130,
            },
            {
                field: 'flavour_score',
                header: 'flavor',
            },
            {
                field: 'aftertaste_score',
                header: 'Aftertaste',
            },
            {
                field: 'acidity_score',
                header: 'Acidity',
            },
            {
                field: 'body_score',
                header: 'Body',
            },
            {
                field: 'balance_score',
                header: 'Balance',
            },
            {
                field: 'uniformity_score',
                header: 'Uniformirty',
            },
            {
                field: 'cleancup_score',
                header: 'Clean cup',
            },
            {
                field: 'sweetness_score',
                header: 'Sweetness',
            },
            {
                field: 'overall_score',
                header: 'Overall',
            },
        ];
    }

    ngOnChanges() {
        this.cuppingReportId = this.cuppingDetails.cupping_report_id;
        if (this.generateReportService.fromQueryParam === 'ServiceRequest') {
            this.serviceRequestId = this.cuppingDetails.order_id;
        } else if (this.generateReportService.fromQueryParam === 'SampleRequest') {
            this.sampleRequestId = this.cuppingDetails.external_sample_id;
        }
        this.getCupReports();
    }

    handleSelectCupping(cuppingId) {
        this.handleChangeCuppingVersion.emit(cuppingId);
    }

    reset() {
        this.singleCuppingData();
        this.getEvaluators();
        this.selectedEvaluators = [];
        this.tableRecords = [];
    }

    getEvaluators() {
        this.greenGradingService.getEvaluatorsList(this.cuppingReportId).subscribe((res: any) => {
            if (res.success === true) {
                this.evaluatorsList = res.result;
                const evaluatorData = res.result.find((ele) => ele.is_primary === true);
                if (evaluatorData) {
                    this.selectedEvaluators = [evaluatorData.evaluator_id];
                }
                this.getCuppingScore();
            } else {
                this.toastrService.error('Error while getting the evaluators list');
            }
        });
    }

    getCupReports() {
        if (this.generateReportService.fromQueryParam === 'ServiceRequest') {
            this.greenGradingService.listServiceCuppingReports(this.serviceRequestId).subscribe((res: any) => {
                if (res.success === true) {
                    this.cuppingReports = res.result;
                    this.selectedCuppingVersion = this.cuppingReports.find(
                        (item) => item.id === this.cuppingDetails.cupping_report_id,
                    );
                    if (this.selectedCuppingVersion) {
                        this.cuppingReportId = this.selectedCuppingVersion.id;
                    } else {
                        this.cuppingReportId = this.cuppingDetails.cupping_report_id;
                    }
                    this.reset();
                } else {
                    this.toastrService.error('Error while getting the cupping reports.');
                }
            });
        } else {
            this.greenGradingService.listSampleCuppingReports(this.sampleRequestId).subscribe((res: any) => {
                if (res.success === true) {
                    this.cuppingReports = res.result;
                    this.selectedCuppingVersion = this.cuppingReports.find(
                        (item) => item.id === this.cuppingDetails.cupping_report_id,
                    );
                    if (this.selectedCuppingVersion) {
                        this.cuppingReportId = this.selectedCuppingVersion.id;
                    } else {
                        this.cuppingReportId = this.cuppingDetails.cupping_report_id;
                    }
                    this.reset();
                } else {
                    this.toastrService.error('Error while getting the cupping reports.');
                }
            });
        }
    }

    getCuppingScore() {
        this.greenGradingService
            .getCuppingScore(this.cuppingReportId, this.cuppingDetails.type)
            .subscribe((data: any) => {
                if (data.success === true) {
                    this.tableRecords = data.result;
                    this.mobileTableData = [];
                    for (const label of this.allColumns) {
                        const tempRow = [label.header];
                        for (const evaluator of this.evaluatorsList) {
                            const dataItem = data.result.find((item) => item.evaluator_id === evaluator.evaluator_id);
                            const value = dataItem ? dataItem[label.field] : '';
                            let additionalValue = '';
                            if (label.field === 'fragrance_score') {
                                additionalValue =
                                    dataItem && dataItem.acidity_intensity
                                        ? `(D:${dataItem.fragrance_dry}, B:${dataItem.fragrance_break})`
                                        : '';
                            }
                            if (label.field === 'acidity_score') {
                                additionalValue =
                                    dataItem && dataItem.acidity_intensity ? `(${dataItem.acidity_intensity})` : '';
                            }
                            if (label.field === 'body_score') {
                                additionalValue = dataItem && dataItem.body_level ? `(${dataItem.body_level})` : '';
                            }
                            tempRow.push(`${value}${additionalValue}`);
                        }
                        this.mobileTableData.push(tempRow);
                    }
                    this.mobileTableData = this.mobileTableData.slice(1);
                } else {
                    this.toastrService.error('Error while getting the Cupping score details');
                }
            });
    }

    reGrade() {
        if (this.generateReportService.fromQueryParam === 'ServiceRequest') {
            this.greenGradingService.recupSample(this.serviceRequestId).subscribe((res: any) => {
                if (res.success === true) {
                    this.toastrService.success('Recupping has started');
                    this.next.emit('screen1');
                } else {
                    this.toastrService.error('Error while downloading report');
                }
            });
        } else {
            this.greenGradingService.recupSampleRequest(this.sampleRequestId).subscribe((res: any) => {
                if (res.success === true) {
                    this.toastrService.success('Recupping has started');
                    this.next.emit('screen1');
                } else {
                    this.toastrService.error('Error while downloading report');
                }
            });
        }
    }

    singleCuppingData() {
        if (this.cuppingReportId) {
            this.greenGradingService.getSingleCuppingDetails(this.cuppingReportId).subscribe((data: any) => {
                if (data.success === true) {
                    this.singleCuppingDetails = data.result;
                } else {
                    this.singleCuppingDetails = {};
                    this.toastrService.error('Error while loading cupping details');
                }
            });
        }
    }

    goBack() {
        this.next.emit('screen3');
    }

    onConfirmGenerate() {
        if (this.singleCuppingDetails.status === 'DRAFT' || this.singleCuppingDetails.status === 'NEW') {
            this.dialogSrv
                .open(ConfirmComponent, {
                    data: {
                        title: 'Are you sure want to generate the report',
                        desp: 'Once generated, no changes can be made to the report',
                        type: 'confirm',
                        noButton: 'No',
                        yesButton: 'Yes, Generate report',
                    },
                })
                .onClose.subscribe((action: any) => {
                    if (action === 'yes') {
                        this.submit();
                    }
                });
        } else {
            this.next.emit('screen5');
        }
    }

    submit() {
        if (this.singleCuppingDetails.status === 'DRAFT' || this.singleCuppingDetails.status === 'NEW') {
            const data = {
                evaluator_ids: this.selectedEvaluators,
                status: 'GENERATED',
            };
            this.greenGradingService.updateStatus(this.cuppingReportId, data).subscribe((res: any) => {
                if (res.success === true) {
                    this.toastrService.success('The report has been updated.');
                    this.next.emit('screen5');
                } else {
                    this.toastrService.error('Error while updating the report');
                }
            });
        } else {
            if (this.cuppingDetails.type === 'INVITED') {
                this.router.navigate(['/green-grading/green-coffee-orders']);
            } else {
                this.next.emit({ screen: 'screen5', selectedCuppingId: this.cuppingReportId });
            }
        }
    }

    save() {
        const data = {
            evaluator_ids: this.selectedEvaluators,
            status: 'DRAFT',
        };

        this.greenGradingService.updateStatus(this.cuppingReportId, data).subscribe((res: any) => {
            if (res.success === true) {
                this.toastrService.success('The report has been updated.');
                this.router.navigate(['/green-grading/green-coffee-orders']);
            } else {
                this.toastrService.error('Error while updating the report');
            }
        });
    }
}
