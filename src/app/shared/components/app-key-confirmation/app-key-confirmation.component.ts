import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-app-key-confirmation',
    templateUrl: './app-key-confirmation.component.html',
    styleUrls: ['./app-key-confirmation.component.scss'],
})
export class AppKeyConfirmationComponent implements OnInit {
    orgName = '';
    constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, public globals: GlobalsService) {}

    ngOnInit(): void {
        this.orgName = this.config.data.orgName;
    }

    close(value = null) {
        this.ref.close(value);
    }
}
