import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService, ApiRequestService } from '@services';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmComponent } from '@app/shared';
import { AppKeyConfirmationComponent } from '@app/shared/components/app-key-confirmation/app-key-confirmation.component';

@Component({
    selector: 'app-api-request-details',
    templateUrl: './api-request-details.component.html',
    styleUrls: ['./api-request-details.component.scss'],
})
export class ApiRequestDetailsComponent implements OnInit {
    breadCrumbItem: MenuItem[] = [];
    loader = true;
    termStatus: any;
    btnToggle = true;
    resetButtonValue: string;
    showStatus = true;
    isDeletedApiKey = false;
    generatedKeyStep = 0;
    roasterID = '';
    keyId = '';
    requestDetailData: any;
    apiKeyId = '';
    apikeyStatus = '';
    initialStatus = '';

    constructor(
        private apiRequestService: ApiRequestService,
        public cookieService: CookieService,
        private toastrService: ToastrService,
        private route: ActivatedRoute,
        public globals: GlobalsService,
        public dialogSrv: DialogService,
    ) {
        this.termStatus = '';
        this.roasterID = this.cookieService.get('roaster_id');
        this.route.queryParams.subscribe((params) => {
            const paramsData = JSON.parse(JSON.stringify(params));
            this.keyId = paramsData.id;
            this.apikeyStatus = paramsData.status;
            this.initialStatus = paramsData.status;
        });
    }

    ngOnInit(): void {
        this.resetButtonValue = 'Generate Key';
        if (this.apikeyStatus === 'GENERATED') {
            this.getGeneratedRoKeys();
        } else {
            this.viewRoDetails();
        }
        this.supplyBreadCrumb();
    }

    supplyBreadCrumb(): void {
        const obj1: MenuItem = {
            label: this.globals.languageJson?.home,
            routerLink: '/',
        };
        const obj2: MenuItem = {
            label: this.globals.languageJson?.api_request,
            routerLink: 'features/api-request',
        };
        this.breadCrumbItem.push(obj1);
        this.breadCrumbItem.push(obj2);
    }

    getGeneratedRoKeys() {
        const data = {
            roaster_id: this.roasterID,
            page: 1,
            per_page: 10,
            org_type: '',
        };
        this.apiRequestService.getGeneratedRoKeys(data).subscribe((res) => {
            if (res.success) {
                this.loader = false;
                this.requestDetailData = res.result[0];
                this.apiKeyId = res.result[0].id;
                if (res.result[0].is_active) {
                    this.btnToggle = true;
                    this.apikeyStatus = 'active';
                } else {
                    this.btnToggle = false;
                    this.apikeyStatus = 'paused';
                }
            }
        });
    }

    viewRoDetails() {
        const data = {
            roaster_id: this.roasterID,
            request_id: this.keyId,
        };
        this.apiRequestService.getApiKeysRequestRo(data).subscribe((res) => {
            if (res.success) {
                this.requestDetailData = res.result;
                this.loader = false;
            }
        });
    }

    generateKey() {
        this.resetButtonValue = 'Generating Key…';
        const data = {
            roaster_id: this.roasterID,
            request_id: this.keyId,
        };
        this.apiRequestService.generateRoApiKey(data).subscribe((res) => {
            if (res.success) {
                this.apikeyStatus = 'GENERATED';
                this.apiKeyId = res.result.id;
            }
        });
    }

    notify() {
        const data = {
            roaster_id: this.roasterID,
            api_key_id: this.apiKeyId,
        };
        this.apiRequestService.notifyRoCustomer(data).subscribe((res) => {
            if (res.success) {
                this.apikeyStatus = 'Notified';
            }
        });
    }

    confirmPauseKey() {
        const data = {
            roaster_id: this.roasterID,
            api_key_id: this.apiKeyId,
        };
        this.apiRequestService.disableRoApiKey(data).subscribe((res) => {
            if (res.success) {
                this.apikeyStatus = 'paused';
                this.toastrService.success('Key access has been paused');
                this.btnToggle = false;
            }
        });
    }

    resumeKey() {
        const data = {
            roaster_id: this.roasterID,
            api_key_id: this.apiKeyId,
        };
        this.apiRequestService.enableRoApiKey(data).subscribe((res) => {
            if (res.success) {
                this.apikeyStatus = 'active';
                this.toastrService.success('Key access has been active');
            }
        });
    }

    activeStatus() {
        this.btnToggle = true;
        if (this.btnToggle === true) {
            this.resumeKey();
        }
    }

    deleteKey() {
        const data = {
            roaster_id: this.roasterID,
            api_key_id: this.apiKeyId,
        };
        this.apiRequestService.deleteRoApiKey(data).subscribe((res) => {
            if (res.success) {
                this.toastrService.error('Key has been delete');
                this.apikeyStatus = 'DELETED';
                this.resetButtonValue = 'Generate Key';
                this.isDeletedApiKey = true;
            }
        });
    }

    delete(): void {
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                },
                showHeader: false,
                styleClass: 'confirm-dialog',
            })
            .onClose.subscribe((action: any) => {
                console.log('action--->>', action);
                if (action === 'yes') {
                    this.deleteKey();
                }
            });
    }

    pause(item: any) {
        this.dialogSrv
            .open(AppKeyConfirmationComponent, {
                data: {
                    orgName: item,
                },
                showHeader: false,
                styleClass: 'confirm-dialog',
            })
            .onClose.subscribe((action: any) => {
                console.log('action--->>', action);
                if (action === 'yes') {
                    this.confirmPauseKey();
                }
            });
    }
}
