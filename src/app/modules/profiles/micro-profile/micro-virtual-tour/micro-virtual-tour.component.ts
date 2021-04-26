import { FileService, UserserviceService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { DialogService } from 'primeng/dynamicdialog';
import { MediaPreviewComponent } from '@app/modules/file-share/components/media-preview/media-preview.component';
import { MicroProfileService } from '../micro-profile.service';
import { OrganizationType } from '@enums';

@Component({
    selector: 'app-micro-virtual-tour',
    templateUrl: './micro-virtual-tour.component.html',
    styleUrls: ['./micro-virtual-tour.component.scss'],
})
export class MicroVirtualTourComponent implements OnInit {
    tourMedias: any = [];
    isLoading?: boolean;
    isSaveMode: boolean;
    @Input() microRoasterId;

    constructor(
        public profileCreationService: MicroProfileService,
        public globals: GlobalsService,
        private fileService: FileService,
        private toasterService: ToastrService,
        public dialogSrv: DialogService,
    ) {}

    async ngOnInit() {
        this.getFiles();
    }

    getFiles() {
        this.isLoading = true;
        this.fileService
            .getGeneralFiles(this.microRoasterId, OrganizationType.MICRO_ROASTER, {
                file_module: 'Gallery',
                type_in: 'VIDEO,IMAGE',
            })
            .subscribe((res) => {
                if (res.success) {
                    this.isLoading = false;
                    this.tourMedias = res.result;
                    console.log('this is tour messages: ', this.tourMedias);
                }
            });
    }

    preview(item) {
        this.dialogSrv.open(MediaPreviewComponent, {
            data: { record: item },
            showHeader: false,
            styleClass: 'preview-dialog',
        });
    }
}
