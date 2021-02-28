import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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

    constructor(private modalService: BsModalService) {
        this.termStatus = '';
    }

    @ViewChild('pausetemplate') private pausetemplate: any;
    @ViewChild('deletetemplate') private deletetemplate: any;

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }
    ngOnInit(): void {
        this.resetButtonValue = 'Generate Key';
    }

    generateKey() {
        this.resetButtonValue = 'Generating Key…';
        setTimeout(() => {
            this.generatedKeyStep = 1;
        }, 2000);
    }

    notify() {
        this.generatedKeyStep = 2;
    }

    pauseKey() {
        this.apikeyStatus = 'paused';
        setTimeout(() => {
            this.modalRef.hide();
        }, 1000);
    }

    activeStatus() {
        this.btnToggle = !this.btnToggle;
        if (this.btnToggle == true) {
            this.statusChange = 'ACTIVE';
        } else {
            this.statusChange = 'INACTIVE';
        }
    }

    setStatus(term: any) {
        this.termStatus = term;
        console.log(this.termStatus);
    }

    onConfirm() {
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
