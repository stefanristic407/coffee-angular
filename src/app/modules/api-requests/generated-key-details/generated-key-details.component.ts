import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService, ApiRequestService, AuthService } from '@services';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmComponent } from '@app/shared';
import { AppKeyConfirmationComponent } from '@app/shared/components/app-key-confirmation/app-key-confirmation.component';

@Component({
    selector: 'app-generated-key-details',
    templateUrl: './generated-key-details.component.html',
    styleUrls: ['./generated-key-details.component.scss'],
})
export class GeneratedKeyDetailsComponent implements OnInit {
    breadCrumbItem: MenuItem[] = [];
    loader = true;
    termStatus: any;
    btnToggle = true;
    resetButtonValue: string;
    showStatus = true;
    isDeletedApiKey = false;
    generatedKeyStep = 0;
    roasterID: number;
    keyId = '';
    requestDetailData: any;
    apiKeyId = '';
    apikeyStatus = '';

    constructor(
        private apiRequestService: ApiRequestService,
        public cookieService: CookieService,
        private toastrService: ToastrService,
        private route: ActivatedRoute,
        public globals: GlobalsService,
        public dialogSrv: DialogService,
        public router: Router,
        private authService: AuthService,
    ) {
        this.roasterID = this.authService.getOrgId();
        this.route.queryParams.subscribe((params) => {
            const paramsData = JSON.parse(JSON.stringify(params));
            this.keyId = paramsData.id;
            this.apikeyStatus = paramsData.status;
        });
    }

    ngOnInit(): void {
        this.resetButtonValue = 'Generate key';
        this.viewRoDetails();
        this.supplyBreadCrumb();
    }

    supplyBreadCrumb(): void {
        this.breadCrumbItem = [
            {
                label: this.globals.languageJson?.home,
                routerLink: '/',
            },
            {
                label: this.globals.languageJson?.api_requests,
                routerLink: '/api-requests-list',
            },
            {
                label: this.globals.languageJson?.generated_key,
            },
        ];
    }

    viewRoDetails() {
        const data = {
            roaster_id: this.roasterID,
            request_id: this.keyId,
        };
        this.apiRequestService.getGeneratedKeysDetails(data).subscribe((res) => {
            if (res.success) {
                this.requestDetailData = res.result;
                this.apiKeyId = res.result.id;
                this.loader = false;
                if (res.result.is_active) {
                    this.btnToggle = true;
                    this.apikeyStatus = 'active';
                } else {
                    this.btnToggle = false;
                    this.apikeyStatus = 'paused';
                }
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
    resume(item: any) {
        this.dialogSrv
            .open(AppKeyConfirmationComponent, {
                data: {
                    orgName: item,
                    status: 'resume',
                },
                showHeader: false,
                styleClass: 'confirm-dialog',
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.resumeKey();
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
                this.btnToggle = true;
                this.apikeyStatus = 'active';
                this.toastrService.success('Key access has been active');
            }
        });
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
                this.resetButtonValue = 'Generate key';
                this.isDeletedApiKey = true;
                const navigationExtras: NavigationExtras = {
                    queryParams: {
                        data: encodeURIComponent('generated-key'),
                    },
                };
                this.router.navigate(['/api-requests-list'], navigationExtras);
            }
        });
    }

    delete(): void {
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                },
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
                    status: 'pause',
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
