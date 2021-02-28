import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-img-preview',
    templateUrl: './img-preview.component.html',
    styleUrls: ['./img-preview.component.scss'],
})
export class ImgPreviewComponent implements OnInit {
    record: any;

    constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
        this.record = this.config.data.record;
    }

    ngOnInit(): void {}

    close(value = null) {
        this.ref.close(value);
    }
}
