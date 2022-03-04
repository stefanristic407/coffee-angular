import { FileService } from '@services';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { GlobalsService } from '@services';
import { ProfileCreationService } from '../profile-creation.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MediaPreviewComponent } from '@app/modules/file-share/components/media-preview/media-preview.component';
import { DestroyableComponent } from '@base-components';
import { FileModule, FileType } from '@enums';

@Component({
    selector: 'app-sewn-virtual-tour',
    templateUrl: './virtual-tour.component.html',
    styleUrls: ['./virtual-tour.component.scss'],
})
export class VirtualTourComponent extends DestroyableComponent implements OnInit {
    tourMedias: any = [];
    isLoading?: boolean;
    isSaveMode: boolean;

    constructor(
        public roasteryProfileService: ProfileCreationService,
        public globals: GlobalsService,
        private fileService: FileService,
        private toasterService: ToastrService,
        public dialogSrv: DialogService,
    ) {
        super();
    }

    async ngOnInit() {
        this.getFiles();
        this.detectMode();
    }

    detectMode() {
        this.roasteryProfileService.saveMode$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((res: boolean) => {
            this.isSaveMode = res;
        });
    }

    getFiles() {
        this.isLoading = true;
        this.fileService
            .getAllFiles({ file_module: FileModule.Gallery, type_in: `${FileType.VIDEO},${FileType.IMAGE}` })
            .subscribe((res) => {
                if (res.success) {
                    this.isLoading = false;
                    this.tourMedias = res.result;
                }
            });
    }

    addFile(data) {
        this.fileService.uploadFiles(data).subscribe((res: any) => {
            if (res.success) {
                this.getFiles();
            } else {
                this.toasterService.error('Failed to upload image');
            }
        });
    }

    handleRemoveMediaFile(id: number): void {
        this.tourMedias = this.tourMedias.filter((item) => item.id !== id);
        this.fileService.deleteFile(id).subscribe();
    }

    handleFile(e) {
        if (e.target.files.length > 0) {
            for (let i = 0; i <= e.target.files.length - 1; i++) {
                const fsize = e.target.files.item(i).size;
                const file = Math.round(fsize / 1024);
                // The size of the file.
                if (file >= 2048) {
                    this.toasterService.error('File too big, please select a file smaller than 2mb');
                } else {
                    const image = e.target.files[0];
                    const File = new FormData();
                    File.append(
                        'name',
                        Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                    );
                    File.append('file', image);
                    File.append('file_module', FileModule.Gallery);
                    this.addFile(File);
                }
            }
        }
    }

    preview(item) {
        this.dialogSrv.open(MediaPreviewComponent, {
            data: { record: item },
            showHeader: false,
            styleClass: 'preview-dialog',
        });
    }
}
