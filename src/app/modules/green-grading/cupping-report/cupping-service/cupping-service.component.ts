import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { TranslateService } from '@ngx-translate/core';
import { GreenGradingService, ResizeService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { GenerateReportService } from '../../generate-report/generate-report.service';

@Component({
    selector: 'app-cupping-service',
    templateUrl: './cupping-service.component.html',
    styleUrls: ['./cupping-service.component.scss'],
})
export class CuppingServiceComponent extends ResizeableComponent implements OnInit {
    breadCrumbItems: MenuItem[];
    viewType = true;
    serviceId: string;
    cuppingReportId: string;
    cuppingScoreDetails: any;
    requestType: string;
    showMobileView = false;

    dataObj: { [key: string]: any } = {};
    category1List = [
        {
            label: 'Full black',
            key1: 'full_black_no',
            key2: 'full_black_eqv',
        },
        {
            label: 'Full sour',
            key1: 'full_sour_no',
            key2: 'full_sour_eqv',
        },
        {
            label: 'Dried cherry/Pod',
            key1: 'dried_cherry_no',
            key2: 'dried_cherry_eqv',
        },
        {
            label: 'Fungus damaged',
            key1: 'fungus_damaged_no',
            key2: 'fungus_damaged_eqv',
        },
        {
            label: 'Foreign matter',
            key1: 'foreign_matter_no',
            key2: 'foreign_matter_eqv',
        },
        {
            label: 'Severe insect damage',
            key1: 'severe_insect_damage_no',
            key2: 'severe_insect_damage_eqv',
        },
    ];

    category2List = [
        {
            label: 'Partial black',
            key1: 'partial_black_no',
            key2: 'partial_black_eqv',
        },
        {
            label: 'Partial sour',
            key1: 'partial_sour_no',
            key2: 'partial_sour_eqv',
        },
        {
            label: 'Parchment / Pergamino',
            key1: 'parchment_no',
            key2: 'parchment_eqv',
        },
        {
            label: 'Floater',
            key1: 'floater_no',
            key2: 'floater_eqv',
        },
        {
            label: 'Immature / Unripe',
            key1: 'immature_no',
            key2: 'immature_eqv',
        },
        {
            label: 'Withered',
            key1: 'withered_no',
            key2: 'withered_eqv',
        },
        {
            label: 'Shells',
            key1: 'shells_no',
            key2: 'shells_eqv',
        },
        {
            label: 'Broken / Chipped/ Cut',
            key1: 'brocken_chipped_no',
            key2: 'brocken_chipped_eqv',
        },
        {
            label: 'Hull / Husk',
            key1: 'hull_husk_no',
            key2: 'hull_husk_eqv',
        },
        {
            label: 'Slight insect damage',
            key1: 'slight_insect_damage_no',
            key2: 'slight_insect_damage_eqv',
        },
    ];

    allColumns: any[];
    evaluatorsList: any = [];
    evaluatorName: string;
    evaluatorsListArray: any[];
    evaluatorData: any;
    singleCuppingDetails: any;
    singleStatus: string;
    completedOn: string;

    category1Defects: any;
    moistureContent: any;
    waterActivity: any;
    odor: any;

    cat2Defects: any;
    totalColors: any = [];

    eachServiceData: any;
    showProcessDetail = false;

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.initializeTable();
    }

    constructor(
        private greenGradingService: GreenGradingService,
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService,
        private translator: TranslateService,
        protected resizeService: ResizeService,
        public generateReportService: GenerateReportService,
    ) {
        super(resizeService);
        this.route.queryParams.subscribe((params) => {
            this.serviceId = params.serviceId;
            this.cuppingReportId = params.cuppingReportId;
            this.requestType = params.requestType;
        });
    }

    ngOnInit(): void {
        this.initializeTable();
        this.breadCrumbItems = [
            { label: this.translator.instant('home'), routerLink: '/' },
            { label: this.translator.instant('menu_sourcing') },
            { label: this.translator.instant('quality_control'), routerLink: '/green-grading' },
            { label: this.translator.instant('my_cupping_reports'), routerLink: '/green-grading/cupping-reports' },
            { label: `${this.translator.instant('order_id')} #${this.serviceId}` },
        ];
        this.ViewCuppingInviteList();
        this.getCuppingScoreDetails();
        this.getEvaluators();
        this.physicalDefectsList();
        this.singleCuppingData();
    }

    toggleMobileView() {
        this.showMobileView = !this.showMobileView;
    }

    initializeTable() {
        this.allColumns = [
            {
                field: 'evaluator_name',
                header: 'Evaluator',
                width: 12,
            },
            {
                field: 'final_score',
                header: 'final_score',
                width: 8,
            },
            {
                field: 'fragrance_score',
                header: 'Fragrance/\nAroma',
                width: 12,
            },
            {
                field: 'flavour_score',
                header: 'flavor',
                width: 7,
            },
            {
                field: 'aftertaste_score',
                header: 'Aftertaste',
                width: 8,
            },
            {
                field: 'acidity_score',
                header: 'Acidity',
                width: 7,
            },
            {
                field: 'body_score',
                header: 'Body',
                width: 7,
            },
            {
                field: 'balance_score',
                header: 'Balance',
                width: 8,
            },
            {
                field: 'uniformity_score',
                header: 'Uniformirty',
                width: 8,
            },
            {
                field: 'cleancup_score',
                header: 'Clean cup',
                width: 8,
            },
            {
                field: 'sweetness_score',
                header: 'Sweetness',
                width: 8,
            },
            {
                field: 'overall_score',
                header: 'Overall',
                width: 7,
            },
        ];
    }

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

    getEvaluators() {
        this.greenGradingService.getEvaluatorsList(this.cuppingReportId).subscribe((res: any) => {
            if (res.success === true) {
                this.evaluatorsList = res.result;
                this.evaluatorData = res.result.find((ele) => ele.is_primary === true);
                this.evaluatorName = this.evaluatorData.evaluator_name;
                this.evaluatorsListArray = res.result.filter((ele) => ele.is_primary !== true);
            } else {
                this.toastrService.error('Error while getting the evaluators list');
            }
        });
    }

    getCuppingScoreDetails() {
        this.greenGradingService
            .getCuppingScore(this.cuppingReportId, this.eachServiceData?.type)
            .subscribe((data: any) => {
                if (data.success === true) {
                    this.cuppingScoreDetails = data.result;
                } else {
                    this.toastrService.error('Error while getting the Cupping score details');
                }
            });
    }

    physicalDefectsList() {
        this.greenGradingService.getPhysicalDefectsList(this.cuppingReportId).subscribe((res: any) => {
            if (res.success === true) {
                const defectsList = res.result;
                for (const cat of this.category1List) {
                    this.dataObj[cat.key1] = defectsList[cat.key1];
                    this.dataObj[cat.key2] = defectsList[cat.key2];
                }
                for (const cat of this.category2List) {
                    this.dataObj[cat.key1] = defectsList[cat.key1];
                    this.dataObj[cat.key2] = defectsList[cat.key2];
                }
                this.category1Defects = defectsList.total_category_one;
                this.cat2Defects = defectsList.total_category_two;
                this.waterActivity = defectsList.water_activity;
                this.odor = defectsList.odor;
                this.totalColors = defectsList.colors?.split(',');
                this.moistureContent = defectsList.moisture_content;
            } else {
                this.toastrService.error('Error while getting physical defects');
            }
        });
    }

    singleCuppingData() {
        if (this.cuppingReportId) {
            this.greenGradingService.getSingleCuppingDetails(this.cuppingReportId).subscribe((data: any) => {
                if (data.success === true) {
                    this.singleCuppingDetails = data.result;
                    this.singleStatus = this.singleCuppingDetails.status;
                    this.completedOn = this.singleCuppingDetails.completed_on;
                } else {
                    this.singleCuppingDetails = {};
                    this.toastrService.error('Error while loading cupping details');
                }
            });
        }
    }

    reGrade() {
        if (this.requestType === 'serviceRequest') {
            this.greenGradingService.recupSample(this.serviceId).subscribe((res: any) => {
                if (res.success === true) {
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
            this.greenGradingService.recupSampleRequest(this.serviceId).subscribe((res: any) => {
                if (res.success === true) {
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

    back() {
        this.location.back();
    }

    routeToProcessDet() {
        this.showProcessDetail = true;
    }

    closeModal() {
        this.showProcessDetail = false;
    }

    generateReportLink() {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                id: this.cuppingReportId,
                requestType: this.requestType,
            },
        };
        this.router.navigate([`/green-grading/generate-new-report`], navigationExtras);
    }
}
