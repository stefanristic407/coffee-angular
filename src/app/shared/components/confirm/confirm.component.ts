import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { GlobalsService } from '@services';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
    constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, public globals: GlobalsService) {}

    ngOnInit(): void {}

    close(value = null) {
        this.ref.close(value);
    }
}
