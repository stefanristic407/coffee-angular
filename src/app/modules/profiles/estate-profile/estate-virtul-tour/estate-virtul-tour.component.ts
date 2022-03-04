import { Component, Input, OnInit } from '@angular/core';
import { EstateProfileService } from '../estate-profile.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MediaPreviewComponent } from '@app/modules/file-share/components/media-preview/media-preview.component';

@Component({
    selector: 'app-estate-virtul-tour',
    templateUrl: './estate-virtul-tour.component.html',
    styleUrls: ['./estate-virtul-tour.component.scss'],
})
export class EstateVirtulTourComponent implements OnInit {
    @Input() estateId;

    constructor(public profileCreationService: EstateProfileService, private dialogSrv: DialogService) {}

    ngOnInit(): void {}

    preview(item) {
        this.dialogSrv.open(MediaPreviewComponent, { data: { record: item } });
    }
}
