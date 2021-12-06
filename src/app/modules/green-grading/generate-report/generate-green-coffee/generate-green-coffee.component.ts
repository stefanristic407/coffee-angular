import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, GreenGradingService, RoasterService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
interface Cupping {
    name: string;
    key: string;
}

@Component({
    selector: 'app-generate-green-coffee',
    templateUrl: './generate-green-coffee.component.html',
    styleUrls: ['./generate-green-coffee.component.scss'],
})
export class GenerateGreenCoffeeComponent implements OnInit, OnChanges {
    cupping: Cupping;
    showCupping = true;
    sampleSize: number;
    sampleSizeUnit: string;
    sampleUnitList = [{ value: 'gm' }, { value: 'lb' }, { value: 'kg' }];
    @Output() next = new EventEmitter<any>();
    @Output() showDetail = new EventEmitter<any>();
    @Input() cuppingDetails;
    @Input() fromQueryParam;
    roasterId: number;
    usersList: any = [];
    cuppingReportId: any;
    evaluatorsListArray: any = [];
    evaluatorData: any;
    evaluatorName: any;
    selectedValue: any;
    addBtnShow = true;
    inputBoxShow = false;
    singleCuppingDetails: {};
    evaluatorId: any;
    cuppingItems: Cupping[];
    filteredUsers: any[];
    isEditable = true;
    evaluatorIds = [];

    constructor(
        private roasterService: RoasterService,
        private toastrService: ToastrService,
        private greenGradingService: GreenGradingService,
        public cookieService: CookieService,
        private primengConfig: PrimeNGConfig,
        private router: Router,
        private authService: AuthService,
    ) {
        this.roasterId = this.authService.getOrgId();
    }

    ngOnInit(): void {
        this.cupping = {
            name: '',
            key: '',
        };
        this.primengConfig.ripple = true;

        this.cuppingItems = [
            {
                name: 'Non-Blinded Cupping',
                key: 'NON_BLINDED',
            },
            {
                name: 'Blinded Cupping',
                key: 'BLINDED',
            },
            {
                name: 'Double-Blinded Cupping',
                key: 'DOUBLE_BLINDED',
            },
        ];
    }

    ngOnChanges(): void {
        this.cuppingReportId = this.cuppingDetails.cupping_report_id;
        const statusKey = this.fromQueryParam === 'ServiceRequest' ? 'cupping_status' : 'status';
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
            this.greenGradingService.getEvaluatorsList(this.roasterId, this.cuppingReportId),
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
            this.greenGradingService
                .getSingleCuppingDetails(this.roasterId, this.cuppingReportId)
                .subscribe((data: any) => {
                    if (data.success === true) {
                        this.singleCuppingDetails = data.result;
                        this.sampleSize = data.result.sample_size;
                        this.sampleSizeUnit = !!data.result.sample_size_unit ? data.result.sample_size_unit : 'gm';
                        this.cupping = this.cuppingItems.find((item: Cupping) => item.key === data.result.cupping_type);
                    } else {
                        this.singleCuppingDetails = {};
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
        if (!this.cupping || (this.cupping && this.cupping.key === '') || this.sampleSize === undefined) {
            this.toastrService.error('Please enter cupping type & Sample size');
        } else {
            if (this.isEditable) {
                const data = {
                    cupping_type: this.cupping.key,
                    sample_size: this.sampleSize,
                    sample_size_unit: this.sampleSizeUnit,
                };
                this.greenGradingService.updateCuppingType(this.cuppingReportId, data).subscribe((res: any) => {
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
    }

    deleteEvaluatorData(data: any) {
        this.evaluatorId = data;
        this.greenGradingService
            .deleteEvaluator(this.roasterId, this.cuppingReportId, this.evaluatorId)
            .subscribe((res: any) => {
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
        if (this.fromQueryParam === 'ServiceRequest') {
            this.router.navigate(['/green-grading/green-coffee-orders']);
        } else if (this.fromQueryParam === 'SampleRequest') {
            this.router.navigate(['/green-grading/grade-sample']);
        } else {
            this.router.navigate(['/green-grading/green-coffee-orders']);
        }
    }

    goBack() {
        this.next.emit('screen1');
    }
}
