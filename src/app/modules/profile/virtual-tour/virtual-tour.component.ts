import { Component, OnInit } from '@angular/core';
import { MediaPreviewComponent } from '@app/modules/file-share/components/media-preview/media-preview.component';
import { DestroyableComponent } from '@base-components';
import { FileModule, FileType } from '@enums';
import { FileService, UserService } from '@services';
import { DialogService } from 'primeng/dynamicdialog';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'app-sewn-virtual-tour',
    templateUrl: './virtual-tour.component.html',
    styleUrls: ['./virtual-tour.component.scss'],
})
export class VirtualTourComponent extends DestroyableComponent implements OnInit {
    readonly FileType = FileType;
    tourMedias: any = [];
    isLoading = true;

    constructor(
        private dialogSrv: DialogService,
        private userService: UserService,
        public profileService: ProfileService,
    ) {
        super();
    }

    ngOnInit() {
        this.getFiles();
    }

    getFiles() {
        this.isLoading = true;

        this.userService
            .getGeneralVirtualTourFiles(this.profileService.orgId, this.profileService.orgType, {
                file_module: FileModule.Gallery,
                type_in: `${FileType.VIDEO},${FileType.IMAGE}`,
            })
            .subscribe((res: any) => {
                if (res.success) {
                    this.isLoading = false;
                    this.tourMedias = res.result;
                }
            });
    }

    preview(item) {
        this.dialogSrv.open(MediaPreviewComponent, { data: { record: item } });
    }
}
