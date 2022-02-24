import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Intensity } from '@enums';
import { TranslateService } from '@ngx-translate/core';
import { GreenGradingService, UserService } from '@services';
import { cuppingScoreValidator } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { GenerateReportService } from '../generate-report.service';

@Component({
    selector: 'app-generate-my-sample',
    templateUrl: './generate-my-sample.component.html',
    styleUrls: ['./generate-my-sample.component.scss'],
})
export class GenerateMySampleComponent implements OnInit, OnChanges {
    @Output() next = new EventEmitter<any>();
    @Output() showDetail = new EventEmitter<any>();
    @Input() cuppingDetails;
    cuppingReportId: any;
    singleCuppingDetails: any = {};
    evaluatorsListArray: any = [];
    evaluatorData: any;
    evaluatorName: any;
    flavourArray: any[];

    intensityOptions = [
        { label: 'Taint', value: Intensity.TAINT },
        { label: 'Fault', value: Intensity.FAULT },
    ];
    advanceOptions = [
        { label: this.translator.instant('advance'), value: true },
        { label: this.translator.instant('quick'), value: false },
    ];

    finalScore: any;
    uniformityComment: any;
    cleancupComment: any;
    uniformityValue: number[] = [];
    cleancupValue: number[] = [];
    sweetnessValue: number[] = [];
    cuppingScoreId: any;
    sampleId: any;
    cuppingDate: any;
    isIncluded: any;
    isAdvance = true;
    availableValues: number[];
    isEditable = true;

    infoForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private generateReportService: GenerateReportService,
        private greenGradingService: GreenGradingService,
        private toastrService: ToastrService,
        private translator: TranslateService,
        private userService: UserService,
    ) {}

    ngOnInit(): void {
        this.availableValues = [];
        for (let i = 6; i <= 10; i += 0.25) {
            this.availableValues.push(i);
        }

        this.infoForm = this.fb.group({
            roast_level: [{ value: [], disabled: !this.isEditable }],
            fragrance_score: [{ value: 6, disabled: !this.isEditable }, [cuppingScoreValidator()]],
            fragrance_break: [{ value: 0, disabled: !this.isEditable }],
            fragrance_dry: [{ value: 0, disabled: !this.isEditable }],
            flavour_score: [{ value: 6, disabled: !this.isEditable }, [cuppingScoreValidator()]],
            aftertaste_score: [{ value: 6, disabled: !this.isEditable }, [cuppingScoreValidator()]],
            acidity_score: [{ value: 6, disabled: !this.isEditable }, [cuppingScoreValidator()]],
            acidity_intensity: [{ value: 0, disabled: !this.isEditable }],
            body_score: [{ value: 6, disabled: !this.isEditable }, [cuppingScoreValidator()]],
            body_level: [{ value: 0, disabled: !this.isEditable }],
            uniformity_score: [{ value: 10, disabled: this.isAdvance && !this.isEditable }, [Validators.required]],
            balance_score: [{ value: 6, disabled: !this.isEditable }, [cuppingScoreValidator()]],
            cleancup_score: [{ value: 10, disabled: this.isAdvance && !this.isEditable }, [Validators.required]],
            sweetness_score: [{ value: 10, disabled: this.isAdvance && !this.isEditable }, [Validators.required]],
            sweetness_comment: [{ value: '', disabled: !this.isEditable }],
            overall_score: [{ value: 6, disabled: !this.isEditable }, [cuppingScoreValidator()]],
            defects_no_of_cups: [{ value: 0, disabled: !this.isEditable }],
            defects_intensity: [{ value: 'TAINT', disabled: !this.isEditable }],
            descriptors: [{ value: [], disabled: !this.isEditable }, [Validators.required]],
            comments: [{ value: '', disabled: !this.isEditable }],
        });
    }

    ngOnChanges(event) {
        this.cuppingReportId = this.cuppingDetails.cupping_report_id;
        const statusKey = this.generateReportService.fromQueryParam === 'ServiceRequest' ? 'cupping_status' : 'status';
        this.isEditable = this.cuppingDetails[statusKey] === 'DRAFT' || this.cuppingDetails[statusKey] === 'NEW';
        this.isAdvance = true;
        if (this.flavourArray?.length) {
            this.getData();
        } else {
            this.userService.getFlavourProfile().subscribe((data: any) => {
                if (data.success === true) {
                    this.flavourArray = (data.result || []).map((item) => {
                        return { label: item.name, value: item.id };
                    });
                    this.getData();
                }
            });
        }
    }

    getData() {
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

    getCuppingScoreDetails() {
        this.greenGradingService
            .getCuppingScore(this.cuppingReportId, this.cuppingDetails.type)
            .subscribe((res: any) => {
                let data;
                if (this.cuppingDetails?.type === 'Invited') {
                    data = res.result;
                    this.infoForm.patchValue({ descriptors: data?.descriptors ?? [] });
                } else {
                    data = res.result?.[0];
                    this.infoForm.patchValue({
                        ...data,
                        descriptors: (data?.descriptors ? data.descriptors.split(',') : []).map((item) => {
                            return {
                                label: item,
                                value: this.flavourArray.find((ix) => ix.label === item)?.value,
                            };
                        }),
                        roast_level: data?.roast_level ? [data.roast_level] : [],
                    });
                }

                if (res.success === true && data) {
                    for (let i = 2; i <= data.uniformity_value; i += 2) {
                        this.uniformityValue.push(i / 2);
                    }
                    for (let i = 2; i <= data.cleancup_value; i += 2) {
                        this.cleancupValue.push(i / 2);
                    }
                    for (let i = 2; i <= data.sweetness_value; i += 2) {
                        this.sweetnessValue.push(i / 2);
                    }
                    this.finalScore = data.final_score;
                } else {
                    this.uniformityValue = [1, 2, 3, 4, 5];
                    this.uniformityComment = '';
                    this.cleancupValue = [1, 2, 3, 4, 5];
                    this.cleancupComment = '';
                    this.sweetnessValue = [1, 2, 3, 4, 5];
                    this.finalScore = 0;
                }

                this.calculateFinalScore();
            });
    }

    onCheckRoastLevel(i) {
        this.infoForm.get('roast_level').setValue([i]);
    }

    selectColor(event: any, section: any, value: any) {
        if (this.isEditable) {
            if (section === 'acidity') {
                if (this.infoForm.get('acidity_intensity').value === value) {
                    this.infoForm.get('acidity_intensity').setValue(0);
                } else {
                    this.infoForm.get('acidity_intensity').setValue(value);
                }
            } else if (section === 'body') {
                if (this.infoForm.get('body_level') === value) {
                    this.infoForm.get('body_level').setValue(0);
                } else {
                    this.infoForm.get('body_level').setValue(value);
                }
            } else if (section === 'defects') {
                if (this.infoForm.get('defects_no_of_cups').value === value) {
                    this.infoForm.get('defects_no_of_cups').setValue(0);
                } else {
                    this.infoForm.get('defects_no_of_cups').setValue(value);
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
                this.infoForm.get('uniformity_score').setValue(this.uniformityValue.length * 2);
            } else if (section === 'cleanCup') {
                if (event.target.checked) {
                    this.cleancupValue.push(value);
                } else {
                    this.cleancupValue = this.cleancupValue.filter((item) => item !== value);
                }
                this.infoForm.get('cleancup_score').setValue(this.cleancupValue.length * 2);
            } else if (section === 'sweetness') {
                if (event.target.checked) {
                    this.sweetnessValue.push(value);
                } else {
                    this.sweetnessValue = this.sweetnessValue.filter((item) => item !== value);
                }
                this.infoForm.get('sweetness_score').setValue(this.sweetnessValue.length * 2);
            }
            this.calculateFinalScore();
        }
    }

    changeMode() {
        if (this.isAdvance && !this.isEditable) {
            this.infoForm.get('uniformity_score').disable();
            this.infoForm.get('cleancup_score').disable();
            this.infoForm.get('sweetness_score').disable();
        } else {
            this.infoForm.get('uniformity_score').enable();
            this.infoForm.get('cleancup_score').enable();
            this.infoForm.get('sweetness_score').enable();
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

    goNext(isTabChange?: boolean) {
        if (!!this.cuppingReportId) {
            if (this.isEditable) {
                if (!this.infoForm.valid) {
                    this.toastrService.error(this.translator.instant('please_check_form_data'));
                    this.infoForm.markAllAsTouched();
                    return;
                }

                const data = {
                    uniformity_value: this.uniformityValue.length * 2,
                    uniformity_comment: this.uniformityComment,
                    cleancup_value: this.cleancupValue.length * 2,
                    cleancup_comment: this.cleancupComment,
                    sweetness_value: this.sweetnessValue.length * 2,
                    total_score: this.finalScore,
                    final_score: this.finalScore,
                    ...this.infoForm.value,
                    roast_level: this.infoForm.value.roast_level[0],
                    flavour_profile_ids: (this.infoForm.value.descriptors || []).map((item) => item.value),
                };
                delete data.descriptors;

                this.greenGradingService.addCuppingScore(this.cuppingReportId, data).subscribe((result: any) => {
                    if (result.success === true) {
                        if (!isTabChange) {
                            this.toastrService.success('Final Score details has been updated');
                        }
                        if (this.cuppingDetails?.type === 'Invited') {
                            this.cancel();
                        } else {
                            if (!isTabChange) {
                                this.next.emit('screen4');
                            }
                        }
                    } else {
                        this.toastrService.error('Please fill all the details');
                    }
                });
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
        score += this.infoForm.get('fragrance_score').value ?? 0;
        score += this.infoForm.get('flavour_score').value ?? 0;
        score += this.infoForm.get('aftertaste_score').value ?? 0;
        score += this.infoForm.get('acidity_score').value ?? 0;
        score += this.infoForm.get('body_score').value ?? 0;
        score += this.infoForm.get('uniformity_score').value ?? 0;
        score += this.infoForm.get('balance_score').value ?? 0;
        score += this.infoForm.get('cleancup_score').value ?? 0;
        score += this.infoForm.get('sweetness_score').value ?? 0;
        score += this.infoForm.get('overall_score').value ?? 0;

        if (this.infoForm.get('defects_intensity').value === Intensity.TAINT) {
            score = score - this.infoForm.get('defects_no_of_cups').value * 2;
        } else {
            score = score - this.infoForm.get('defects_no_of_cups').value * 4;
        }
        this.finalScore = score;
    }
}
