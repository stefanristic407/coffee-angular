import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Download } from '@models';
import { DownloadService, GreenGradingService } from '@services';
import { ConfirmComponent } from '@shared';
import { trackFileName } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-generate-new-report',
    templateUrl: './generate-new-report.component.html',
    styleUrls: ['./generate-new-report.component.scss'],
})
export class GenerateNewReportComponent implements OnInit {
    requestType: string;
    eachServiceData: any;
    cuppingReportId: number;
    singleCuppingDetails: any;
    evaluatorData: any;
    evaluatorName: any;
    filterEval: any = [];
    evalDataList: any = [];
    showProcessDetail = false;
    title = 'Generate Report';
    generateStep = 0;

    constructor(
        private dialogSrv: DialogService,
        private downloadService: DownloadService,
        private greenGradingService: GreenGradingService,
        private location: Location,
        private route: ActivatedRoute,
        private toastrService: ToastrService,
    ) {
        this.route.queryParams.subscribe((params) => {
            this.cuppingReportId = +params.id;
            this.requestType = params.requestType;
            this.ViewCuppingInviteList();
            this.evaluatorsList();
            this.singleCuppingData();
        });
    }

    ngOnInit(): void {}

    ViewCuppingInviteList() {
        if (this.requestType === 'serviceRequest') {
            this.greenGradingService.getCuppingInviteList().subscribe((res: any) => {
                const mainData = res.success ? res.result : [];
                if (this.cuppingReportId) {
                    this.eachServiceData = mainData.find((ele) => ele.cupping_report_id === this.cuppingReportId);
                }
            });
        } else {
            this.greenGradingService.listCuppingRequest().subscribe((res: any) => {
                const mainData = res.success ? res.result : [];
                if (this.cuppingReportId) {
                    this.eachServiceData = mainData.find((ele) => ele.cupping_report_id === this.cuppingReportId);
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

    evaluatorsList() {
        if (this.cuppingReportId) {
            this.greenGradingService.getEvaluatorsList(this.cuppingReportId).subscribe((res: any) => {
                if (res.success === true) {
                    this.evalDataList = res.result;
                    this.evaluatorData = res.result.filter((ele) => ele.is_primary === true);
                    this.evaluatorName = this.evaluatorData[0].evaluator_name;
                } else {
                    this.toastrService.error('Error while getting the evaluators list');
                }
            });
        }
    }

    generateReport() {
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
                    this.goOtherGenerate();
                }
            });
    }

    goOtherGenerate() {
        this.generateStep = 1;
        this.title = 'Generated Report';
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
        const evaluatorIds = this.filterEval.map((item) => item.evaluator_id);
        this.greenGradingService.downloadReport(this.cuppingReportId, evaluatorIds.join(',')).subscribe((res: any) => {
            if (res.success === true) {
                this.toastrService.success('The report has been downloaded');
                this.downloadFile(res.result.url);
            } else {
                this.toastrService.error('Cupping Scores not found!');
            }
        });
    }

    back() {
        if (this.generateStep === 0) {
            this.location.back();
        } else {
            this.generateStep = 0;
        }
    }

    routeToProcessDet() {
        this.showProcessDetail = true;
    }

    closeModal() {
        this.showProcessDetail = false;
    }
}
