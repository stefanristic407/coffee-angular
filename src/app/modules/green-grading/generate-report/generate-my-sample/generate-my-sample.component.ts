import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, GreenGradingService, UserService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GenerateReportService } from '../generate-report.service';

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
    cuppingReportId: any;
    roasterId: number;
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
    isEditable = true;

    constructor(
        private authService: AuthService,
        private generateReportService: GenerateReportService,
        private greenGradingService: GreenGradingService,
        private toastrService: ToastrService,
        private userService: UserService,
    ) {
        this.roasterId = this.authService.getOrgId();
    }

    ngOnInit(): void {
        this.getFlavourProfileList();
        this.availableValues = [];
        for (let i = 6; i <= 10; i += 0.25) {
            this.availableValues.push(i);
        }
    }

    ngOnChanges() {
        this.cuppingReportId = this.cuppingDetails.cupping_report_id;
        const statusKey = this.generateReportService.fromQueryParam === 'ServiceRequest' ? 'cupping_status' : 'status';
        this.isEditable = this.cuppingDetails[statusKey] === 'DRAFT' || this.cuppingDetails[statusKey] === 'NEW';
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

    getFlavourProfileList() {
        this.userService.getFlavourProfile().subscribe((data: any) => {
            if (data.success === true) {
                this.flavourArray =
                    data.result.map((item) => {
                        item.name = item.name.charAt(0).toUpperCase() + item.name.slice(1, item.name.length);
                        return item;
                    }) ?? [];
            }
        });
    }

    setChipsValue(getFlavourArray) {
        this.langChips = [];
        getFlavourArray.forEach((element) => {
            const findObj = this.flavourArray.find((item) => item.name === element);
            if (findObj) {
                this.langChips.push(findObj);
            }
        });
    }

    getCuppingScoreDetails() {
        this.greenGradingService
            .getCuppingScore(this.cuppingReportId, this.cuppingDetails.type)
            .subscribe((res: any) => {
                let getFlavourArray = [];
                let data;
                if (this.cuppingDetails?.type === 'Invited') {
                    data = res.result;
                    this.langChips = data?.descriptors ?? [];
                } else {
                    data = res.result?.[0];
                    getFlavourArray = data?.descriptors ? data.descriptors.split(',') : [];
                    this.setChipsValue(getFlavourArray);
                }
                if (res.success === true && data) {
                    this.roastLevel = [data.roast_level];
                    this.fragrance = data.fragrance_score;
                    this.fragranceBreak = data.fragrance_break;
                    this.fragranceDry = data.fragrance_dry;
                    this.flavorScore = data.flavour_score;
                    this.aftertasteScore = data.aftertaste_score;
                    this.acidityScore = data.acidity_score;
                    this.acidityIntensity = data.acidity_intensity;
                    this.bodyScore = data.body_score;
                    this.bodyLevel = data.body_level;
                    this.uniformityScore = data.uniformity_score;
                    for (let i = 2; i <= data.uniformity_value; i += 2) {
                        this.uniformityValue.push(i / 2);
                    }
                    this.balanceScore = data.balance_score;
                    this.cleancupScore = data.cleancup_score;
                    for (let i = 2; i <= data.cleancup_value; i += 2) {
                        this.cleancupValue.push(i / 2);
                    }
                    this.sweetnessScore = data.sweetness_score;
                    for (let i = 2; i <= data.sweetness_value; i += 2) {
                        this.sweetnessValue.push(i / 2);
                    }
                    this.sweetnessComment = data.sweetness_comment;
                    this.overallScore = data.overall_score;
                    this.defectsNoOfCups = data.defects_no_of_cups;
                    this.defectIntensity = data.defects_intensity;
                    this.btnToggle = this.defectIntensity === 'TAINT' ? true : false;
                    this.finalScore = data.final_score;
                    this.comments = data.comments;
                    getFlavourArray = data.descriptors ? data.descriptors.split(',') : [];
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
            });
    }

    onCheckRoastLevel(i) {
        this.roastLevel = [i];
    }

    selectColor(event: any, section: any, value: any) {
        if (this.isEditable) {
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
    }

    selectLevels(event: any, section: any, value: number) {
        if (this.isEditable) {
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
    }

    changeMode() {
        this.isAdvance = !this.isAdvance;
    }

    changeDefectIntensity() {
        if (this.isEditable) {
            this.btnToggle = !this.btnToggle;
            if (this.btnToggle === true) {
                this.defectIntensity = 'Taint';
            } else {
                this.defectIntensity = 'Fault';
            }
            this.calculateFinalScore();
        }
    }

    evaluatorsList() {
        this.greenGradingService.getEvaluatorsList(this.cuppingReportId).subscribe((response: any) => {
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
        if (!this.langChips?.length) {
            this.toastrService.error('Please add Flavour profile');
            return false;
        }
        return true;
    }

    goNext() {
        if (!!this.cuppingReportId) {
            if (this.isEditable) {
                if (this.checkValidation()) {
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
                                if (this.cuppingDetails?.type === 'Invited') {
                                    this.cancel();
                                } else {
                                    this.next.emit('screen4');
                                }
                            } else {
                                this.toastrService.error('Please fill all the details');
                            }
                        });
                }
            } else {
                if (this.cuppingDetails?.type === 'Invited') {
                    this.cancel();
                } else {
                    this.next.emit('screen4');
                }
            }
        }
    }

    cancel() {
        this.generateReportService.backToOriginalPage();
    }

    goBack() {
        if (this.cuppingDetails?.type === 'Invited') {
            this.cancel();
        } else {
            this.next.emit('screen2');
        }
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
    }
}
