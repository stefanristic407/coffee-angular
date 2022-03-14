import { Component, EventEmitter, OnInit, Output, Input, OnChanges } from '@angular/core';
import { CuppingStatus } from '@enums';
import { Download } from '@models';
import { DownloadService, GreenGradingService } from '@services';
import { trackFileName } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { GenerateReportService } from '../generate-report.service';

@Component({
    selector: 'app-generate-cupping-report',
    templateUrl: './generate-cupping-report.component.html',
    styleUrls: ['./generate-cupping-report.component.scss'],
})
export class GenerateCuppingReportComponent implements OnInit, OnChanges {
    @Output() next = new EventEmitter<any>();
    @Output() showDetail = new EventEmitter<any>();
    @Output() afterUpload = new EventEmitter<any>();
    @Input() cuppingDetails;
    @Input() selectedCuppingId;

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

    get completed() {
        const statusKey = this.generateReportService.fromQueryParam === 'ServiceRequest' ? 'cupping_status' : 'status';
        return this.cuppingDetails[statusKey] === CuppingStatus.COMPLETED;
    }

    constructor(
        private downloadService: DownloadService,
        private generateReportService: GenerateReportService,
        private greenGradingService: GreenGradingService,
        private toastrService: ToastrService,
    ) {}

    ngOnInit(): void {}

    ngOnChanges() {
        if (this.generateReportService.fromQueryParam === 'ServiceRequest') {
            this.serviceRequestId = this.cuppingDetails.order_id;
        } else if (this.generateReportService.fromQueryParam === 'SampleRequest') {
            this.sampleRequestId = this.cuppingDetails.external_sample_id;
        }
        this.cuppingReportId = this.selectedCuppingId ?? this.cuppingDetails.cupping_report_id;
        this.getEvaluatorData(this.cuppingReportId);
        this.getEvaluatorData(this.selectedCuppingId);
        this.singleCuppingData();
        if (!this.selectedCuppingId) {
            this.getCupReports();
        }
    }

    getEvaluatorData(reportingId) {
        this.greenGradingService.getEvaluatorsList(reportingId).subscribe((res: any) => {
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

    getCupReports() {
        if (this.generateReportService.fromQueryParam === 'ServiceRequest') {
            this.greenGradingService.listServiceCuppingReports(this.serviceRequestId).subscribe((res: any) => {
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
            this.greenGradingService.listSampleCuppingReports(this.sampleRequestId).subscribe((res: any) => {
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

    downloadFile(url: string) {
        this.downloadService.download(url, trackFileName(url), 'application/pdf').subscribe(
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

    downloadReport() {
        const evalIds = this.evaluatorArray[this.cuppingReportId].map((item) => item.evaluator_id);
        this.greenGradingService.downloadReport(this.cuppingReportId, evalIds.join(',')).subscribe((res: any) => {
            if (res.success === true) {
                this.downloadFile(res.result.url);
            } else {
                this.toastrService.error('Cupping Scores not found!');
            }
        });
    }

    completeReport() {
        const ids = this.evaluatorArray[this.cuppingReportId].map((item: any) => item.evaluator_id);
        const data = {
            status: CuppingStatus.COMPLETED,
            evaluator_ids: ids,
        };
        this.greenGradingService.updateStatus(this.cuppingReportId, data).subscribe((res: any) => {
            if (res.success === true) {
                this.toastrService.success('The report has been completed.');
                this.afterUpload.emit();
            } else {
                this.toastrService.error('Error while updating the report');
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
