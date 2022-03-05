import { OrganizationType } from '@enums';
import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from '../../profile.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MediaPreviewComponent } from '@app/modules/file-share/components/media-preview/media-preview.component';

@Component({
    selector: 'app-virtual-tour',
    templateUrl: './virtual-tour.component.html',
    styleUrls: ['./virtual-tour.component.scss'],
})
export class VirtualTourComponent implements OnInit {
    @Input() profileId;
    @Input() orgType: OrganizationType;

    constructor(public profileService: ProfileService, private dialogSrv: DialogService) {}

    ngOnInit(): void {
        this.profileService.getVirtualTourFiles(this.orgType, this.profileId);
    }

    preview(item) {
        this.dialogSrv.open(MediaPreviewComponent, {
            data: { record: item },
        });
    }
}
