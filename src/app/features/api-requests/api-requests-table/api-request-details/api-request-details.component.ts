import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { RoasterserviceService } from '@services';

@Component({
    selector: 'app-api-request-details',
    templateUrl: './api-request-details.component.html',
    styleUrls: ['./api-request-details.component.css'],
})
export class ApiRequestDetailsComponent implements OnInit {
    loader = true;
    termStatus: any;
    btnToggle = true;
    modalRef: BsModalRef;
    resetButtonValue: string;
    showStatus: boolean = true;
    isDeletedApiKey: boolean = false;
    generatedKeyStep: number = 0;
    roasterID: string = '';
    keyId: string = '';
    requestDetailData: any;
    apiKeyId: string = '';
    apikeyStatus: string = '';
    initialStatus: string = '';

    constructor(
        private modalService: BsModalService,
        private roasterserviceService: RoasterserviceService,
        public cookieService: CookieService,
        private toastrService: ToastrService,
        private route: ActivatedRoute,
    ) {
        this.termStatus = '';
        this.roasterID = this.cookieService.get('roaster_id');
        this.route.queryParams.subscribe((params) => {
            console.log('params---->>>>', params);
            const paramsData = JSON.parse(JSON.stringify(params));
            this.keyId = paramsData.id;
            this.apikeyStatus = paramsData.status;
            this.initialStatus = paramsData.status;
        });
    }

    @ViewChild('pausetemplate') private pausetemplate: any;
    @ViewChild('deletetemplate') private deletetemplate: any;

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }
    ngOnInit(): void {
        this.resetButtonValue = 'Generate Key';
        if (this.apikeyStatus === 'GENERATED') {
            this.getGeneratedRoKeys();
        } else {
            this.viewRoDetails();
        }
    }

    getGeneratedRoKeys() {
        const data = {
            roaster_id: this.roasterID,
            page: 1,
            per_page: 10,
            org_type: '',
        };
        this.roasterserviceService.getGeneratedRoKeys(data).subscribe((res) => {
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
        this.roasterserviceService.getApiKeysRequestRo(data).subscribe((res) => {
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
        this.roasterserviceService.generateRoApiKey(data).subscribe((res) => {
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
        this.roasterserviceService.notifyRoCustomer(data).subscribe((res) => {
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
        this.roasterserviceService.disableRoApiKey(data).subscribe((res) => {
            if (res.success) {
                this.apikeyStatus = 'paused';
                this.toastrService.success('Key access has been paused');
                this.modalRef.hide();
            }
        });
    }

    resumeKey() {
        const data = {
            roaster_id: this.roasterID,
            api_key_id: this.apiKeyId,
        };
        this.roasterserviceService.enableRoApiKey(data).subscribe((res) => {
            if (res.success) {
                this.apikeyStatus = 'active';
                this.toastrService.success('Key access has been active');
            }
        });
    }

    activeStatus() {
        this.btnToggle = !this.btnToggle;
        if (this.btnToggle === true) {
            this.resumeKey();
        }
    }

    onConfirm() {
        const data = {
            roaster_id: this.roasterID,
            api_key_id: this.apiKeyId,
        };
        this.roasterserviceService.deleteRoApiKey(data).subscribe((res) => {
            console.log('res---<>>>', res);
            if (res.success) {
                this.toastrService.error('Key has been delete');
                this.modalRef.hide();
                this.apikeyStatus = 'DELETED';
                this.resetButtonValue = 'Generate Key';
                this.isDeletedApiKey = true;
            }
        });
    }

    delete() {
        this.openModal(this.deletetemplate);
    }
    pause() {
        this.openModal(this.pausetemplate);
    }
}
