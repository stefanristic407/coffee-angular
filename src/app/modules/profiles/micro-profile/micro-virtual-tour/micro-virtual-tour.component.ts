import { Component, Input, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { DialogService } from 'primeng/dynamicdialog';
import { MediaPreviewComponent } from '@app/modules/file-share/components/media-preview/media-preview.component';
import { MicroProfileService } from '../micro-profile.service';

@Component({
    selector: 'app-micro-virtual-tour',
    templateUrl: './micro-virtual-tour.component.html',
    styleUrls: ['./micro-virtual-tour.component.scss'],
})
export class MicroVirtualTourComponent implements OnInit {
    @Input() microRoasterId;

    constructor(
        public globals: GlobalsService,
        public dialogSrv: DialogService,
        public microProfileService: MicroProfileService,
    ) {}

    async ngOnInit() {}

    preview(item) {
        this.dialogSrv.open(MediaPreviewComponent, { data: { record: item } });
    }
}
