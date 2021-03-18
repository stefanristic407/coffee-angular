import { Component, EventEmitter, OnInit, Output, Input, OnChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService, GreenGradingService } from '@services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-generate-my-sample',
    templateUrl: './generate-my-sample.component.html',
    styleUrls: ['./generate-my-sample.component.scss'],
})
export class GenerateMySampleComponent implements OnInit, OnChanges {
    langChips: any = [];
    selectable = true;
    removable = true;
    @Output() next = new EventEmitter<any>();
    @Output() showDetail = new EventEmitter<any>();
    @Input() cuppingDetails;
    @Input() fromQueryParam;
    cuppingReportId: any;
    roasterId: string;
    singleCuppingDetails: any = {};
    evaluatorsListArray: any = [];
    evaluatorData: any;
    evaluatorName: any;
    flavourArray: any = [];

    finalScore: any;
    overallScore: any;
    balanceScore: any;
    uniformityScore: any;
    uniformityComment: any;
    cleancupScore: any;
    cleancupComment: any;
    sweetnessScore: any;
    sweetnessComment: any;
    comments: any;
    bodyScore: any;
    acidityScore: any;
    aftertasteScore: any;
    flavorScore: any;
    fragranceDry: any = 0;
    fragranceBreak: any = 0;
    fragrance: any;
    roastLevel: any;
    defectsNoOfCups: any;
    acidityIntensity: any = 1;
    bodyLevel: any = 1;
    uniformityValue: number[] = [];
    cleancupValue: number[] = [];
    sweetnessValue: number[] = [];
    btnToggle = true;
    defectIntensity: string;
    cuppingScoreId: any;
    sampleId: any;
    cuppingDate: any;
    isIncluded: any;
    isAdvance = true;
    availableValues: number[];

    constructor(
        private toastrService: ToastrService,
        private cookieService: CookieService,
        private userService: UserserviceService,
        private greenGradingService: GreenGradingService,
        private router: Router,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.availableValues = [];
        for (let i = 6; i <= 10; i += 0.25) {
            this.availableValues.push(i);
        }
    }

    ngOnChanges() {
        this.cuppingReportId = this.cuppingDetails.cupping_report_id;
        this.isAdvance = true;
        this.uniformityValue = [];
        this.cleancupValue = [];
        this.sweetnessValue = [];
        this.evaluatorsList();
        this.singleCuppingData();
        this.getCuppingScoreDetails();
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
    flavourProfileList(getFlavourArray) {
        this.userService.getFlavourProfile().subscribe((data: any) => {
            if (data.success === true) {
                this.flavourArray = data.result;

                this.langChips = [];
                getFlavourArray.forEach((element) => {
                    const findObj = data.result.find((item) => item.name === element);
                    if (findObj) {
                        this.langChips.push(findObj);
                    }
                });
            }
        });
    }

    getCuppingScoreDetails() {
        this.greenGradingService.getCuppingScore(this.roasterId, this.cuppingReportId).subscribe((res: any) => {
            let getFlavourArray = [];
            if (res.success === true && res.result.length > 0) {
                this.roastLevel = [res.result[0].roast_level];
                this.fragrance = res.result[0].fragrance_score;
                this.fragranceBreak = res.result[0].fragrance_break;
                this.fragranceDry = res.result[0].fragrance_dry;
                this.flavorScore = res.result[0].flavour_score;
                this.aftertasteScore = res.result[0].aftertaste_score;
                this.acidityScore = res.result[0].acidity_score;
                this.acidityIntensity = res.result[0].acidity_intensity;
                this.bodyScore = res.result[0].body_score;
                this.bodyLevel = res.result[0].body_level;
                this.uniformityScore = res.result[0].uniformity_score;
                for (let i = 2; i <= res.result[0].uniformity_value; i += 2) {
                    this.uniformityValue.push(i / 2);
                }
                this.balanceScore = res.result[0].balance_score;
                this.cleancupScore = res.result[0].cleancup_score;
                for (let i = 2; i <= res.result[0].cleancup_value; i += 2) {
                    this.cleancupValue.push(i / 2);
                }
                this.sweetnessScore = res.result[0].sweetness_score;
                for (let i = 2; i <= res.result[0].sweetness_value; i += 2) {
                    this.sweetnessValue.push(i / 2);
                }
                this.sweetnessComment = res.result[0].sweetness_comment;
                this.overallScore = res.result[0].overall_score;
                this.defectsNoOfCups = res.result[0].defects_no_of_cups;
                this.defectIntensity = res.result[0].defects_intensity;
                this.btnToggle = this.defectIntensity === 'TAINT' ? true : false;
                this.finalScore = res.result[0].final_score;
                this.comments = res.result[0].comments;
                getFlavourArray = res.result[0].descriptors ? res.result[0].descriptors.split(',') : [];
            } else {
                this.roastLevel = [0];
                this.fragrance = 6;
                this.fragranceBreak = 0;
                this.fragranceDry = 0;
                this.flavorScore = 6;
                this.aftertasteScore = 6;
                this.acidityScore = 6;
                this.acidityIntensity = 0;
                this.bodyScore = 6;
                this.bodyLevel = 0;
                this.uniformityScore = 10;
                this.uniformityValue = [1, 2, 3, 4, 5];
                this.uniformityComment = '';
                this.balanceScore = 6;
                this.cleancupScore = 10;
                this.cleancupValue = [1, 2, 3, 4, 5];
                this.cleancupComment = '';
                this.sweetnessScore = 10;
                this.sweetnessValue = [1, 2, 3, 4, 5];
                this.sweetnessComment = '';
                this.overallScore = 6;
                this.defectsNoOfCups = 0;
                this.defectIntensity = 'TAINT';
                this.btnToggle = this.defectIntensity === 'TAINT' ? true : false;
                this.finalScore = 0;
                this.comments = '';
            }

            this.calculateFinalScore();
            this.flavourProfileList(getFlavourArray);
        });
    }

    onCheckRoastLevel(i) {
        this.roastLevel = [i];
    }

    selectColor(event: any, section: any, value: any) {
        if (section === 'acidity') {
            if (this.acidityIntensity === value) {
                this.acidityIntensity = 0;
            } else {
                this.acidityIntensity = value;
            }
        } else if (section === 'body') {
            if (this.bodyLevel === value) {
                this.bodyLevel = 0;
            } else {
                this.bodyLevel = value;
            }
        } else if (section === 'defects') {
            if (this.defectsNoOfCups === value) {
                this.defectsNoOfCups = 0;
            } else {
                this.defectsNoOfCups = value;
            }
            this.calculateFinalScore();
        }
    }

    selectLevels(event: any, section: any, value: number) {
        if (section === 'uniformity') {
            if (event.target.checked) {
                this.uniformityValue.push(value);
            } else {
                this.uniformityValue = this.uniformityValue.filter((item) => item !== value);
            }
            this.uniformityScore = this.uniformityValue.length * 2;
        } else if (section === 'cleanCup') {
            if (event.target.checked) {
                this.cleancupValue.push(value);
            } else {
                this.cleancupValue = this.cleancupValue.filter((item) => item !== value);
            }
            this.cleancupScore = this.cleancupValue.length * 2;
        } else if (section === 'sweetness') {
            if (event.target.checked) {
                this.sweetnessValue.push(value);
            } else {
                this.sweetnessValue = this.sweetnessValue.filter((item) => item !== value);
            }
            this.sweetnessScore = this.sweetnessValue.length * 2;
        }
        this.calculateFinalScore();
    }

    changeMode() {
        this.isAdvance = !this.isAdvance;
    }

    changeDefectIntensity() {
        this.btnToggle = !this.btnToggle;
        if (this.btnToggle === true) {
            this.defectIntensity = 'Taint';
        } else {
            this.defectIntensity = 'Fault';
        }
        this.calculateFinalScore();
    }

    evaluatorsList() {
        this.greenGradingService.getEvaluatorsList(this.roasterId, this.cuppingReportId).subscribe((response: any) => {
            if (response.success === true) {
                this.evaluatorData = response.result.filter((ele) => ele.is_primary === true);
                this.evaluatorName = this.evaluatorData[0].evaluator_name;
                this.evaluatorsListArray = response.result.filter((ele) => ele.is_primary !== true);
            }
        });
    }

    addLang(event) {
        const existedItem = this.langChips.find((item) => item.id === event.value.id);
        if (existedItem) {
            return;
        }
        const name = event.value.name;

        if ((name || '').trim() && event.value) {
            this.langChips = [...this.langChips, event.value];
        }
    }

    checkValidation() {
        if (
            !this.availableValues.includes(this.fragrance) ||
            !this.availableValues.includes(this.flavorScore) ||
            !this.availableValues.includes(this.aftertasteScore) ||
            !this.availableValues.includes(this.acidityScore) ||
            !this.availableValues.includes(this.bodyScore) ||
            !this.availableValues.includes(this.balanceScore) ||
            !this.availableValues.includes(this.overallScore)
        ) {
            this.toastrService.error('Value should be between 6 ~ 10 in 0.25 increments');
            return false;
        }
        if (!this.uniformityScore || !this.cleancupScore || !this.sweetnessScore) {
            this.toastrService.error('Please select values');
            return false;
        }
        return true;
    }

    goNext() {
        if (!!this.cuppingReportId && this.checkValidation()) {
            if (this.cuppingDetails.cupping_status === 'DRAFT') {
                const data = {
                    roast_level: this.roastLevel[0],
                    fragrance_score: this.fragrance,
                    fragrance_dry: this.fragranceDry,
                    fragrance_break: this.fragranceBreak,
                    flavour_score: this.flavorScore,
                    aftertaste_score: this.aftertasteScore,
                    acidity_score: this.acidityScore,
                    acidity_intensity: this.acidityIntensity,
                    body_score: this.bodyScore,
                    body_level: this.bodyLevel,
                    uniformity_score: this.uniformityScore,
                    uniformity_value: this.uniformityValue.length * 2,
                    uniformity_comment: this.uniformityComment,
                    balance_score: this.balanceScore,
                    cleancup_score: this.cleancupScore,
                    cleancup_value: this.cleancupValue.length * 2,
                    cleancup_comment: this.cleancupComment,
                    sweetness_score: this.sweetnessScore,
                    sweetness_value: this.sweetnessValue.length * 2,
                    sweetness_comment: this.sweetnessComment,
                    overall_score: this.overallScore,
                    defects_no_of_cups: this.defectsNoOfCups,
                    defects_intensity: this.defectIntensity,
                    total_score: this.finalScore,
                    final_score: this.finalScore,
                    flavour_profile_ids: this.langChips.map((ele) => {
                        return ele.id;
                    }),
                    comments: this.comments,
                };
                this.greenGradingService
                    .addCuppingScore(this.roasterId, this.cuppingReportId, data)
                    .subscribe((result: any) => {
                        if (result.success === true) {
                            this.toastrService.success('Final Score details has been updated');
                            this.next.emit('screen4');
                        } else {
                            this.toastrService.error('Please fill all the details');
                        }
                    });
            } else {
                this.next.emit('screen4');
            }
        }
    }

    cancel() {
        if (this.fromQueryParam === 'ServiceRequest') {
            this.router.navigate(['/green-grading/green-coffee-orders']);
        } else if (this.fromQueryParam === 'SampleRequest') {
            this.router.navigate(['/green-grading/grade-sample']);
        } else {
            this.router.navigate(['/green-grading/green-coffee-orders']);
        }
    }

    goBack() {
        this.next.emit('screen2');
    }

    calculateFinalScore() {
        let score = 0;
        score += this.fragrance ?? 0;
        score += this.flavorScore ?? 0;
        score += this.aftertasteScore ?? 0;
        score += this.acidityScore ?? 0;
        score += this.bodyScore ?? 0;
        score += this.balanceScore ?? 0;
        score += this.uniformityScore ?? 0;
        score += this.cleancupScore ?? 0;
        score += this.sweetnessScore ?? 0;
        score += this.overallScore ?? 0;

        if (this.btnToggle) {
            score = score - this.defectsNoOfCups * 2;
        } else {
            score = score - this.defectsNoOfCups * 4;
        }
        this.finalScore = score;

        // score += this.fragranceDry ?? 0;
        // score += this.fragranceBreak ?? 0;
        // score += this.acidityIntensity ?? 0;
        // score += this.bodyLevel ?? 0;
        // score += this.cleancupValue ?? 0;
        // score += this.sweetnessValue ?? 0;
        // score += this.defectsNoOfCups ?? 0;
    }
}
