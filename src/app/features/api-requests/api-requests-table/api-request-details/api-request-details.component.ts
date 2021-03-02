import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';

@Component({
    selector: 'app-api-request-details',
    templateUrl: './api-request-details.component.html',
    styleUrls: ['./api-request-details.component.css'],
})
export class ApiRequestDetailsComponent implements OnInit {
    termStatus: any;
    btnToggle = true;
    statusChange: string;
    modalRef: BsModalRef;
    resetButtonValue: string;
    showStatus: boolean = true;
    isDeletedApiKey: boolean = false;
    generatedKeyStep: number = 0;
    apikeyStatus: string = '';
    roasterID: string = '';
    keyId: string = '';
    requestDetailData: any;

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
            this.keyId = params['id'];
        });
    }

    @ViewChild('pausetemplate') private pausetemplate: any;
    @ViewChild('deletetemplate') private deletetemplate: any;

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }
    ngOnInit(): void {
        this.resetButtonValue = 'Generate Key';
        this.viewRoDetails();
    }

    viewRoDetails() {
        const data = {
            roaster_id: this.roasterID,
            request_id: this.keyId,
        };
        this.roasterserviceService.getApiKeysRequestRo(data).subscribe((res) => {
            console.log('res---<>>>', res);
            if (res.success) {
                this.requestDetailData = res.result;
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
            console.log('res---<>>>', res);
            if (res.success) {
                this.generatedKeyStep = 1;
            }
        });
        setTimeout(() => {
            this.generatedKeyStep = 1;
        }, 2000);
    }

    notify() {
        const data = {
            roaster_id: this.roasterID,
            api_key_id: this.keyId,
        };
        this.roasterserviceService.notifyRoCustomer(data).subscribe((res) => {
            console.log('res---<>>>', res);
        });
        this.generatedKeyStep = 2;
    }

    pauseKey() {
        const data = {
            roaster_id: this.roasterID,
            api_key_id: this.keyId,
        };
        this.roasterserviceService.disableRoApiKey(data).subscribe((res) => {
            console.log('res---<>>>', res);
        });
        this.toastrService.success('Key access has been paused');
        this.apikeyStatus = 'paused';
        setTimeout(() => {
            this.modalRef.hide();
        }, 1000);
    }

    resumeKey() {
        const data = {
            roaster_id: this.roasterID,
            api_key_id: this.keyId,
        };
        this.roasterserviceService.enableRoApiKey(data).subscribe((res) => {
            console.log('res---<>>>', res);
        });
        this.toastrService.success('Key access has been paused');
    }

    activeStatus() {
        this.btnToggle = !this.btnToggle;
        if (this.btnToggle == true) {
            this.statusChange = 'ACTIVE';
            this.resumeKey();
        } else {
            this.pauseKey();
            this.statusChange = 'INACTIVE';
        }
    }

    setStatus(term: any) {
        this.termStatus = term;
        console.log(this.termStatus);
    }

    onConfirm() {
        const data = {
            roaster_id: this.roasterID,
            api_key_id: 2,
        };
        this.roasterserviceService.deleteRoApiKey(data).subscribe((res) => {
            console.log('res---<>>>', res);
        });
        this.toastrService.error('Key has been delete');
        this, this.modalRef.hide();
        this.isDeletedApiKey = true;
        setTimeout(() => {
            this.modalRef.hide();
        }, 1000);
    }

    toggleStatus() {
        this.showStatus = !this.showStatus;
        if (this.showStatus == false) {
            document.getElementById('status_id').style.border = '1px solid #30855c';
        } else {
            document.getElementById('status_id').style.border = '1px solid #d6d6d6';
        }
    }

    delete() {
        this.openModal(this.deletetemplate);
    }
    pause() {
        this.openModal(this.pausetemplate);
    }
}
