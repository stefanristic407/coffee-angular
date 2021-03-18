import { Component, EventEmitter, OnInit, OnChanges, Output, Input } from '@angular/core';
import { RoasterserviceService, GreenGradingService } from '@services';
import { UserserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

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
    roasterId: string;
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
    constructor(
        private roasterService: RoasterserviceService,
        private toastrService: ToastrService,
        // private userService: UserserviceService,
        private greenGradingService: GreenGradingService,
        public cookieService: CookieService,
        private primengConfig: PrimeNGConfig,
        private router: Router,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.cupping = {
            name: '',
            key: '',
        };
        this.primengConfig.ripple = true;
        this.getUsersList();

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
        this.evaluatorsList();
        this.singleCuppingData();
        this.addBtnShow = this.cuppingDetails.type !== 'Invited';
    }

    evaluatorsList() {
        this.greenGradingService.getEvaluatorsList(this.roasterId, this.cuppingReportId).subscribe((response: any) => {
            if (response.success === true) {
                this.evaluatorsListArray = response.result;
                this.evaluatorData = response.result.find((ele) => ele.is_primary === true);
                this.evaluatorName = this.evaluatorData.evaluator_name;
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

    getUsersList() {
        this.roasterService.getRoasterUsers(this.roasterId).subscribe((data: any) => {
            if (data.success === true) {
                this.usersList = data.result;
            } else {
                this.toastrService.error('Error while fetching users list');
            }
        });
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
            this.roasterService.getUserBasedRoles(this.roasterId, this.selectedValue.id).subscribe((result: any) => {
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
