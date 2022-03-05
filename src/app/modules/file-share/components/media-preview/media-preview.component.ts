import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Plyr from 'plyr';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-media-preview',
    templateUrl: './media-preview.component.html',
    styleUrls: ['./media-preview.component.scss'],
})
export class MediaPreviewComponent implements OnInit, AfterViewInit {
    record: any;

    constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
        this.record = this.config.data.record;
        this.config.showHeader = false;
        this.config.styleClass = 'preview-dialog';
    }

    ngOnInit(): void {}

    ngAfterViewInit() {
        const player = new Plyr('#player');
        $('.popup-video').parents('.modal-content').addClass('video-content');
    }

    close(value = null) {
        this.ref.close(value);
    }
}
