import { Component, OnInit } from '@angular/core';
import { AuthService, GreenGradingService } from '@services';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GenerateReportService } from '../../generate-report/generate-report.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmComponent } from '@shared';

@Component({
    selector: 'app-generate-new-report',
    templateUrl: './generate-new-report.component.html',
    styleUrls: ['./generate-new-report.component.scss'],
})
export class GenerateNewReportComponent implements OnInit {
    roasterId: any;
    requestType: string;
    eachServiceData: any;
    cuppingReportId: any;
    singleCuppingDetails: any;
    evaluatorData: any;
    evaluatorName: any;
    filterEval: any = [];
    evalDataList: any = [];
    showProcessDetail = false;
    title = 'Generate Report';
    generateStep = 0;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private cookieService: CookieService,
        private toastrService: ToastrService,
        public generateReportService: GenerateReportService,
        private greenGradingService: GreenGradingService,
        public dialogSrv: DialogService,
        private authService: AuthService,
    ) {
        this.roasterId = this.authService.getOrgId();
        this.route.queryParams.subscribe((params) => {
            this.cuppingReportId = params.id;
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
                    this.eachServiceData = mainData.find(
                        (ele) => ele.cupping_report_id.toString() === this.cuppingReportId.toString(),
                    );
                }
            });
        } else {
            this.greenGradingService.listCuppingRequest().subscribe((res: any) => {
                const mainData = res.success ? res.result : [];
                if (this.cuppingReportId) {
                    this.eachServiceData = mainData.find(
                        (ele) => ele.cupping_report_id.toString() === this.cuppingReportId.toString(),
                    );
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

    downloadFile(item: any) {
        console.log(item);
        const a = document.createElement('a');
        a.href = item;
        a.download = 'report' + '.pdf';
        a.target = '_blank';
        // document.body.appendChild(a);
        a.click();
        // document.body.removeChild(a);
    }

    downloadReport() {
        const evaluatorIds = this.filterEval.map((item) => item.evaluator_id);
        this.greenGradingService
            .downloadReport(this.roasterId, this.cuppingReportId, evaluatorIds.join(','))
            .subscribe((res: any) => {
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
