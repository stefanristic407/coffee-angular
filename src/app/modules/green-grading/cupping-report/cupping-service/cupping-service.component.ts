import { Component, OnInit, HostListener } from '@angular/core';
import { GlobalsService } from '@services';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { GreenGradingService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { GenerateReportService } from '../../generate-report/generate-report.service';
import { MenuItem } from 'primeng/api';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-cupping-service',
    templateUrl: './cupping-service.component.html',
    styleUrls: ['./cupping-service.component.scss'],
})
export class CuppingServiceComponent implements OnInit {
    breadCrumbItems: MenuItem[];
    roasterId: string;
    viewType = true;
    serviceId: string;
    cuppingReportId: string;
    cuppingScoreDetails: any;
    requestType: string;
    showMobileView = false;

    labels: any[] = [
        {
            label: 'Aroma',
            key: 'fragrance_score',
        },
        {
            label: 'Dry',
            key: 'fragrance_dry',
        },
        {
            label: 'Break',
            key: 'fragrance_break',
        },
        {
            label: 'Flavour',
            key: 'flavour_score',
        },
        {
            label: 'Aftertaste',
            key: 'aftertaste_score',
        },
        {
            label: 'Acidity',
            key: 'acidity_score',
        },
        {
            label: 'Body',
            key: 'body_score',
        },
        {
            label: 'Balance',
            key: 'balance_score',
        },
        {
            label: 'Uniformirty',
            key: 'uniformity_score',
        },
        {
            label: 'Clean cup',
            key: 'cleancup_score',
        },
        {
            label: 'Sweetness',
            key: 'sweetness_score',
        },
        {
            label: 'Overall',
            key: 'overall_score',
        },
    ];

    dataObj: { [key: string]: any } = {};
    category1List = [
        {
            label: 'Full Black',
            key1: 'full_black_no',
            key2: 'full_black_eqv',
        },
        {
            label: 'Full Sour',
            key1: 'full_sour_no',
            key2: 'full_sour_eqv',
        },
        {
            label: 'Dried Cherry/Pod',
            key1: 'dried_cherry_no',
            key2: 'dried_cherry_eqv',
        },
        {
            label: 'Fungus Damaged',
            key1: 'fungus_damaged_no',
            key2: 'fungus_damaged_eqv',
        },
        {
            label: 'Foreign Matter',
            key1: 'foreign_matter_no',
            key2: 'foreign_matter_eqv',
        },
        {
            label: 'Severe Insect Damage',
            key1: 'severe_insect_damage_no',
            key2: 'severe_insect_damage_eqv',
        },
    ];
    category2List = [
        {
            label: 'Partial Black',
            key1: 'partial_black_no',
            key2: 'partial_black_eqv',
        },
        {
            label: 'Partial Sour',
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
            label: 'Hull/Husk',
            key1: 'hull_husk_no',
            key2: 'hull_husk_eqv',
        },
        {
            label: 'Slight Insect Damage',
            key1: 'slight_insect_damage_no',
            key2: 'slight_insect_damage_eqv',
        },
    ];

    isMobileView = false;
    allColumns: any[];
    evaluatorsList: any = [];
    evaluatorName: string;
    evaluatorsListArray: any[];
    mobileTableData: any[] = [];
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
        public globals: GlobalsService,
        private router: Router,
        private route: ActivatedRoute,
        private cookieService: CookieService,
        public generateReportService: GenerateReportService,
        private location: Location,
        private toastrService: ToastrService,
        private greenGradingService: GreenGradingService,
    ) {
        this.route.queryParams.subscribe((params) => {
            this.serviceId = params.serviceId;
            this.cuppingReportId = params.cuppingReportId;
            this.requestType = params.requestType;
            this.roasterId = this.cookieService.get('roaster_id');
            this.ViewCuppingInviteList();
            this.getCuppingScoreDetails();
            this.getEvaluators();
            // this.viewProcessDetails();
            this.getCuppingScoreDetails();
            this.physicalDefectsList();
            this.singleCuppingData();
        });
    }

    ngOnInit(): void {
        this.initializeTable();
        this.breadCrumbItems = [
            { label: this.globals.languageJson?.home, routerLink: '/features/micro-roaster-dashboard' },
            { label: this.globals.languageJson?.green_grading, routerLink: '/green-grading' },
            { label: 'My Cupping Reports', routerLink: '/green-grading/cupping-reports' },
            { label: `Service iD #${this.serviceId}` },
        ];
    }

    toggleMobileView() {
        this.showMobileView = !this.showMobileView;
    }

    initializeTable() {
        this.allColumns = [
            {
                field: 'evaluator_name',
                header: 'Evaluator',
                sortable: false,
                width: 100,
            },
            {
                field: 'final_score',
                header: 'Final Score',
                sortable: false,
            },
            {
                field: 'fragrance_score',
                header: 'Fragrance/\nAroma',
                sortable: false,
                width: 100,
            },
            {
                field: 'flavour_score',
                header: 'Flavour',
                sortable: false,
            },
            {
                field: 'aftertaste_score',
                header: 'Aftertaste',
                sortable: false,
            },
            {
                field: 'acidity_score',
                header: 'Acidity',
                sortable: false,
            },
            {
                field: 'body_score',
                header: 'Body',
                sortable: false,
            },
            {
                field: 'balance_score',
                header: 'Balance',
                sortable: false,
            },
            {
                field: 'uniformity_score',
                header: 'Uniformirty',
                sortable: false,
            },
            {
                field: 'cleancup_score',
                header: 'Clean cup',
                sortable: false,
            },
            {
                field: 'sweetness_score',
                header: 'Sweetness',
                sortable: false,
            },
            {
                field: 'overall_score',
                header: 'Overall',
                sortable: false,
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
            this.greenGradingService.listCuppingRequest(this.roasterId).subscribe((res: any) => {
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
        this.greenGradingService.getEvaluatorsList(this.roasterId, this.cuppingReportId).subscribe((res: any) => {
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
        this.greenGradingService.getCuppingScore(this.roasterId, this.cuppingReportId).subscribe((data: any) => {
            if (data.success === true) {
                this.cuppingScoreDetails = data.result;
                this.mobileTableData = [];
                for (const label of this.allColumns) {
                    const tempRow = [label.header];
                    for (const evaluator of this.evaluatorsList) {
                        const dataItem = data.result.find((item) => item.evaluator_id === evaluator.evaluator_id);
                        const value = dataItem ? dataItem[label.field] : '';
                        let additionalValue = '';
                        if (label.field === 'fragrance_score') {
                            additionalValue = dataItem
                                ? `(D:${dataItem.fragrance_dry}, B:${dataItem.fragrance_break})`
                                : '';
                        }
                        if (label.field === 'acidity_score') {
                            additionalValue = dataItem ? `(${dataItem.acidity_intensity})` : '';
                        }
                        if (label.field === 'body_score') {
                            additionalValue = dataItem ? `(${dataItem.body_level})` : '';
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

    physicalDefectsList() {
        this.greenGradingService.getPhysicalDefectsList(this.roasterId, this.cuppingReportId).subscribe((res: any) => {
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
                this.totalColors = defectsList.colors.split(',');
                this.moistureContent = defectsList.moisture_content;
            } else {
                this.toastrService.error('Error while getting physical defects');
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
            this.greenGradingService.recupSample(this.roasterId, this.serviceId).subscribe((res: any) => {
                if (res.success === true) {
                    this.toastrService.success('Recupping has started');
                    this.router.navigate(['/green-grading/cupping-reports']);
                } else {
                    this.toastrService.error('Error while downloading report');
                }
            });
        } else {
            this.greenGradingService.recupSampleRequest(this.roasterId, this.serviceId).subscribe((res: any) => {
                if (res.success === true) {
                    this.toastrService.success('Recupping has started');
                    this.router.navigate(['/green-grading/cupping-reports']);
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
