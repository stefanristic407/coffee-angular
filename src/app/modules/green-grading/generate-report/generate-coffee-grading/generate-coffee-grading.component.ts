import { Component, EventEmitter, OnChanges, Output, Input } from '@angular/core';
import { AuthService, GreenGradingService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GenerateReportService } from '../generate-report.service';

@Component({
    selector: 'app-generate-coffee-grading',
    templateUrl: './generate-coffee-grading.component.html',
    styleUrls: ['./generate-coffee-grading.component.scss'],
})
export class GenerateCoffeeGradingComponent implements OnChanges {
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

    category1Defects: any;
    moistureContent: any;
    waterActivity: any;
    odor: any;
    cat2Defects: any;
    totalDefects: any;
    totalColors: any = [];
    colorList: any[] = [
        {
            label: 'Blue',
            value: 'Blue',
        },
        {
            label: 'Blue - Green',
            value: 'Blue - Green',
        },
        {
            label: 'Green',
            value: 'Green',
        },
        {
            label: 'Greenish',
            value: 'Greenish',
        },
        {
            label: 'Yellow - Green',
            value: 'Yellow - Green',
        },
        {
            label: 'Pale Yellow',
            value: 'Pale Yellow',
        },
        {
            label: 'Yellowish',
            value: 'Yellowish',
        },
        {
            label: 'Brownish',
            value: 'Brownish',
        },
    ];

    @Output() next = new EventEmitter<any>();
    @Output() showDetail = new EventEmitter<any>();
    @Input() cuppingDetails;
    roasterId: any;
    cuppingId: any;
    evaluatorData: any;
    evaluatorName: any;
    colorString: any;
    isEditable = true;

    constructor(
        private authService: AuthService,
        private router: Router,
        private toastrService: ToastrService,
        public cookieService: CookieService,
        public generateReportService: GenerateReportService,
        public greenGradingService: GreenGradingService,
    ) {
        this.roasterId = this.authService.getOrgId();
    }

    ngOnChanges(): void {
        const statusKey = this.generateReportService.fromQueryParam === 'ServiceRequest' ? 'cupping_status' : 'status';
        this.isEditable = this.cuppingDetails?.[statusKey] === 'DRAFT' || this.cuppingDetails?.[statusKey] === 'NEW';
        if (this.cuppingDetails?.type === 'Invited') {
            this.next.emit('screen3');
        } else {
            this.getEvaluatorData();
            this.physicalDefectsList();
        }
    }

    getEvaluatorData() {
        this.cuppingId = this.cuppingDetails?.cupping_report_id;
        this.greenGradingService.getEvaluatorsList(this.cuppingId).subscribe((res: any) => {
            if (res.success === true) {
                this.evaluatorData = res.result[0];
                this.evaluatorName = this.evaluatorData.evaluator_name;
            }
        });
    }

    goNext() {
        this.cuppingId = this.cuppingDetails.cupping_report_id;
        if (this.isEditable) {
            const data: any = {};
            if (this.moistureContent) {
                data.moisture_content = this.moistureContent;
            }
            if (this.waterActivity) {
                data.water_activity = this.waterActivity;
            }
            if (this.totalColors && this.totalColors.length > 0) {
                data.colors = this.totalColors.toString();
            }
            if (this.odor) {
                data.odor = this.odor;
            }
            if (this.totalDefects) {
                data.total_green_defects = this.totalDefects;
            }

            if (this.category1Defects) {
                data.total_category_one = this.category1Defects;
            }
            if (this.cat2Defects) {
                data.total_category_two = this.cat2Defects;
            }
            for (const cat of this.category1List) {
                if (this.dataObj[cat.key1]) {
                    data[cat.key1] = this.dataObj[cat.key1];
                }
                if (this.dataObj[cat.key2]) {
                    data[cat.key2] = this.dataObj[cat.key2];
                }
            }
            for (const cat of this.category2List) {
                if (this.dataObj[cat.key1]) {
                    data[cat.key1] = this.dataObj[cat.key1];
                }
                if (this.dataObj[cat.key2]) {
                    data[cat.key2] = this.dataObj[cat.key2];
                }
            }
            this.greenGradingService.addPhysicalDefects(this.roasterId, this.cuppingId, data).subscribe((res: any) => {
                if (res.success === true) {
                    this.toastrService.success('Physical defects added/updated successfully');
                    this.next.emit('screen2');
                } else {
                    this.toastrService.error('Error while adding/updating physical defects');
                }
            });
        } else {
            this.next.emit('screen2');
        }
    }

    physicalDefectsList() {
        this.cuppingId = this.cuppingDetails?.cupping_report_id;
        this.greenGradingService.getPhysicalDefectsList(this.cuppingId).subscribe((res: any) => {
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
                this.totalDefects = defectsList.total_green_defects;
                this.moistureContent = defectsList.moisture_content;
            } else {
                this.toastrService.error('Error while getting physical defects');
                this.clear();
            }
        });
    }

    skip() {
        this.next.emit('screen2');
    }

    clear() {
        for (const cat of this.category1List) {
            this.dataObj[cat.key1] = '';
            this.dataObj[cat.key2] = '';
        }
        for (const cat of this.category2List) {
            this.dataObj[cat.key1] = '';
            this.dataObj[cat.key2] = '';
        }
        this.category1Defects = '';
        this.moistureContent = '';
        this.waterActivity = '';
        this.odor = '';
        this.totalColors = [];
        this.cat2Defects = '';
        this.totalDefects = '';
    }

    cancel() {
        this.generateReportService.backToOriginalPage();
    }

    handleDefectsChange(event) {
        if (event.index === '1') {
            this.category1Defects = event.value;
        } else {
            this.cat2Defects = event.value;
        }
    }

    handleChange(event) {
        this.dataObj = event;
    }
}
