import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuantityUnit } from '@enums';
import { TranslateService } from '@ngx-translate/core';
import { GreenGradingService, RoasterService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { GenerateReportService } from '../generate-report.service';

@Component({
    selector: 'app-generate-green-coffee',
    templateUrl: './generate-green-coffee.component.html',
    styleUrls: ['./generate-green-coffee.component.scss'],
})
export class GenerateGreenCoffeeComponent implements OnInit, OnChanges {
    showCupping = true;
    sampleUnitList = [{ value: QuantityUnit.g }, { value: QuantityUnit.lb }, { value: QuantityUnit.kg }];
    cuppingItems: any[] = [
        {
            label: 'Non-Blinded cupping',
            value: 'NON_BLINDED',
        },
        {
            label: 'Blinded cupping',
            value: 'BLINDED',
        },
        {
            label: 'Double-Blinded cupping',
            value: 'DOUBLE_BLINDED',
        },
    ];

    @Output() next = new EventEmitter<any>();
    @Output() showDetail = new EventEmitter<any>();
    @Input() cuppingDetails;
    usersList: any = [];
    cuppingReportId: any;
    evaluatorsListArray: any = [];
    evaluatorData: any;
    evaluatorName: any;
    selectedValue: any;
    addBtnShow = true;
    inputBoxShow = false;
    evaluatorId: any;
    filteredUsers: any[];
    isEditable = true;
    evaluatorIds = [];

    infoForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private generateReportService: GenerateReportService,
        private greenGradingService: GreenGradingService,
        private primengConfig: PrimeNGConfig,
        private roasterService: RoasterService,
        private router: Router,
        private toastrService: ToastrService,
        private translator: TranslateService,
    ) {}

    ngOnInit(): void {
        this.primengConfig.ripple = true;

        this.infoForm = this.fb.group({
            cupping_type: [{ value: null, disabled: !this.isEditable }, [Validators.required]],
            sample_size: [{ value: null, disabled: !this.isEditable }, [Validators.required]],
            sample_size_unit: [{ value: QuantityUnit.g, disabled: !this.isEditable }, [Validators.required]],
        });
    }

    ngOnChanges(): void {
        this.cuppingReportId = this.cuppingDetails.cupping_report_id;
        const statusKey = this.generateReportService.fromQueryParam === 'ServiceRequest' ? 'cupping_status' : 'status';
        this.isEditable = this.cuppingDetails[statusKey] === 'DRAFT' || this.cuppingDetails[statusKey] === 'NEW';
        this.evaluatorsList();
        this.singleCuppingData();
        this.addBtnShow = this.cuppingDetails.type !== 'Invited';
    }

    evaluatorsList() {
        const options = {
            per_page: 1000,
        };
        combineLatest([
            this.greenGradingService.getEvaluatorsList(this.cuppingReportId),
            this.roasterService.getOrgUsers(options),
        ])
            .pipe(take(1))
            .subscribe(([response, data]: [any, any]) => {
                if (response.success) {
                    this.evaluatorsListArray = response.result;
                    this.evaluatorsListArray.map((item) => {
                        this.evaluatorIds.push(item.evaluator_id);
                    });
                    this.evaluatorData = response.result.find((ele) => ele.is_primary);
                    this.evaluatorName = this.evaluatorData.evaluator_name;
                }

                if (data.success) {
                    this.usersList = data.result.filter((element) => !this.evaluatorIds.includes(element.id));
                } else {
                    this.toastrService.error('Error while fetching users list');
                }
            });
    }

    singleCuppingData() {
        if (this.cuppingReportId) {
            this.greenGradingService.getSingleCuppingDetails(this.cuppingReportId).subscribe((data: any) => {
                if (data.success) {
                    this.infoForm.patchValue({ ...data.result, sample_size: data.result?.sample_size || null });
                }
            });
        }
    }

    filterUsers(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const user of this.usersList) {
            if (
                user.firstname.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
                user.lastname.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
                user.email.toLowerCase().indexOf(query.toLowerCase()) >= 0
            ) {
                filtered.push(user);
            }
        }

        this.filteredUsers = filtered;
    }

    addEvaluators() {
        if (this.selectedValue !== '') {
            this.roasterService.getUserBasedRoles(this.selectedValue.id).subscribe((result: any) => {
                if (result.success === true) {
                    const roleName = result.result[0].name;
                    const data = {
                        evaluator_id: this.selectedValue.id,
                        evaluator_type: roleName,
                    };
                    this.greenGradingService.addEvaluators(this.cuppingReportId, data).subscribe((res: any) => {
                        if (res.success === true) {
                            this.toastrService.success('The Evaluator has been added ');
                            this.evaluatorsList();
                            this.addBtnShow = true;
                            this.inputBoxShow = false;
                        } else {
                            this.toastrService.error('Error while adding the evaluator');
                        }
                    });
                }
            });
        } else {
            this.toastrService.error('Please add the Evaluator');
        }
    }

    addBtnClick() {
        this.addBtnShow = false;
        this.inputBoxShow = true;
    }

    cancelEvaluators() {
        this.addBtnShow = true;
        this.inputBoxShow = false;
        this.selectedValue = '';
    }

    goNext() {
        if (this.isEditable) {
            if (!this.infoForm.valid) {
                this.toastrService.error(this.translator.instant('please_check_form_data'));
                this.infoForm.markAllAsTouched();
                return;
            }
            this.greenGradingService
                .updateCuppingType(this.cuppingReportId, this.infoForm.value)
                .subscribe((res: any) => {
                    if (res.success) {
                        this.toastrService.success('Cupping type updated');
                        this.next.emit('screen3');
                    } else {
                        this.toastrService.error('Error while Updating');
                    }
                });
        } else {
            this.next.emit('screen3');
        }
    }

    deleteEvaluatorData(data: any) {
        this.evaluatorId = data;
        this.greenGradingService.deleteEvaluator(this.cuppingReportId, this.evaluatorId).subscribe((res: any) => {
            if (res.success) {
                this.toastrService.success('Removed assigned evaluator');
                this.evaluatorsList();
            } else if (res.messages) {
                this.toastrService.error('Evaluator status ' + res.messages.status[0].replace('_', ' ') + '.');
            } else {
                this.toastrService.error('Error while removing evaluator');
            }
        });
    }

    cancel() {
        this.generateReportService.backToOriginalPage();
    }

    goBack() {
        this.next.emit('screen1');
    }
}
