import { Component, EventEmitter, OnInit, Output, Input, OnChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GreenGradingService } from '@services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-generate-cupping-report',
    templateUrl: './generate-cupping-report.component.html',
    styleUrls: ['./generate-cupping-report.component.scss'],
})
export class GenerateCuppingReportComponent implements OnInit, OnChanges {
    @Output() next = new EventEmitter<any>();
    @Output() showDetail = new EventEmitter<any>();
    @Input() cuppingDetails;
    @Input() selectedCuppingId;
    @Input() fromQueryParam;
    roasterId: string;
    evaluatorData: any;
    evaluatorName: any;
    cuppingReportId: any;
    serviceRequestId: any;
    cuppingReports: any = [];
    sampleRequestId: any;
    evaluatorArray: {
        [key: string]: any[];
    } = {};
    singleCuppingDetails: any;
    activeState: boolean[] = [];

    constructor(
        private toastrService: ToastrService,
        private cookieService: CookieService,
        private greenGradingService: GreenGradingService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {}

    ngOnChanges() {
        if (this.fromQueryParam === 'ServiceRequest') {
            this.serviceRequestId = this.cuppingDetails.gc_order_id;
        } else if (this.fromQueryParam === 'SampleRequest') {
            this.sampleRequestId = this.cuppingDetails.external_sample_id;
        }
        if (this.selectedCuppingId) {
            this.cuppingReportId = this.selectedCuppingId;
            this.getEvaluatorData(this.selectedCuppingId);
        } else {
            this.cuppingReportId = this.cuppingDetails.cupping_report_id;
            this.getCupReports();
        }
        this.singleCuppingData();
    }

    getEvaluatorData(reportingId) {
        this.greenGradingService.getEvaluatorsList(this.roasterId, reportingId).subscribe((res: any) => {
            if (res.success === true) {
                this.evaluatorArray[reportingId] = res.result;
                this.evaluatorData = res.result.find((item) => item.is_primary);
                this.evaluatorName = this.evaluatorData.evaluator_name;
            } else {
                this.evaluatorArray[reportingId] = [];
            }
        });
    }

    singleCuppingData() {
        if (this.cuppingReportId) {
            this.greenGradingService
                .getSingleCuppingDetails(this.roasterId, this.cuppingReportId)
                .subscribe((data: any) => {
                    if (data.success === true) {
                        this.singleCuppingDetails = data.result;
                    } else {
                        this.singleCuppingDetails = {};
                        this.toastrService.error('Error while loading cupping details');
                    }
                });
        }
    }

    getCupReports() {
        if (this.fromQueryParam === 'ServiceRequest') {
            this.greenGradingService
                .listServiceCuppingReports(this.roasterId, this.serviceRequestId)
                .subscribe((res: any) => {
                    if (res.success === true) {
                        this.cuppingReports = res.result;
                        this.cuppingReports.forEach((element, index) => {
                            this.getEvaluatorData(element.id);
                            this.activeState[index] = index === 0 ? true : false;
                        });
                    } else {
                        this.toastrService.error('Error while getting the cupping reports.');
                    }
                });
        } else {
            this.greenGradingService
                .listSampleCuppingReports(this.roasterId, this.sampleRequestId)
                .subscribe((res: any) => {
                    if (res.success === true) {
                        this.cuppingReports = res.result;
                        this.cuppingReports.forEach((element, index) => {
                            this.activeState[index] = index === 0 ? true : false;
                        });
                    } else {
                        this.toastrService.error('Error while getting the cupping reports.');
                    }
                });
        }
    }

    reGrade() {
        if (this.fromQueryParam === 'ServiceRequest') {
            this.greenGradingService.recupSample(this.roasterId, this.serviceRequestId).subscribe((res: any) => {
                if (res.success === true) {
                    this.toastrService.success('Recupping has started');
                    this.next.emit('screen1');
                } else {
                    this.toastrService.error('Error while downloading report');
                }
            });
        } else {
            this.greenGradingService.recupSampleRequest(this.roasterId, this.sampleRequestId).subscribe((res: any) => {
                if (res.success === true) {
                    this.toastrService.success('Recupping has started');
                    this.next.emit('screen1');
                } else {
                    this.toastrService.error('Error while downloading report');
                }
            });
        }
    }

    uploadReport() {
        const ids = this.evaluatorArray[this.cuppingReportId].map((item: any) => item.evaluator_id);
        const data = {
            status: 'COMPLETED',
            evaluator_ids: ids,
        };
        this.greenGradingService.updateStatus(this.roasterId, this.cuppingReportId, data).subscribe((res: any) => {
            if (res.success === true) {
                this.toastrService.success('The Report has been updated.');
            } else {
                this.toastrService.error('Error while updating the report');
            }
        });
    }
    downloadFile(item: any) {
        const a = document.createElement('a');
        a.href = item;
        a.download = 'Report' + '.pdf';
        a.target = '_blank';
        // document.body.appendChild(a);
        a.click();
        // document.body.removeChild(a);
    }

    downloadReport() {
        this.greenGradingService.downloadReport(this.roasterId, this.cuppingReportId).subscribe((res: any) => {
            if (res.success === true) {
                this.toastrService.success('The report has been downloaded');
                this.downloadFile(res.result.url);
            } else {
                this.toastrService.error('Cupping Scores not found!');
            }
        });
    }

    onOpen(event) {
        this.cuppingReportId = this.cuppingReports[event.index].id;
    }

    onClose(event) {
        this.activeState[event.index] = true;
    }

    back() {
        this.next.emit('screen4');
    }
}
