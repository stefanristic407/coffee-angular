import { Component, OnInit } from '@angular/core';
import { MediaPreviewComponent } from '@app/modules/file-share/components/media-preview/media-preview.component';
import { DestroyableComponent } from '@base-components';
import { FileModule, FileType } from '@enums';
import { FileService } from '@services';
import { checkFile } from '@utils';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { takeUntil } from 'rxjs/operators';
import { ProfileCreationService } from '../profile-creation.service';

@Component({
    selector: 'app-sewn-virtual-tour',
    templateUrl: './virtual-tour.component.html',
    styleUrls: ['./virtual-tour.component.scss'],
})
export class VirtualTourComponent extends DestroyableComponent implements OnInit {
    readonly FileType = FileType;
    tourMedias: any = [];
    isLoading = true;
    isSaveMode: boolean;

    constructor(
        private dialogSrv: DialogService,
        private fileService: FileService,
        private profileCreationService: ProfileCreationService,
        private toastrService: ToastrService,
    ) {
        super();
    }

    ngOnInit() {
        this.getFiles();
        this.detectMode();
    }

    detectMode() {
        this.profileCreationService.saveMode$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((res: boolean) => {
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

    handleRemoveMediaFile(id: number): void {
        this.tourMedias = this.tourMedias.filter((item) => item.id !== id);
        this.fileService.deleteFile(id).subscribe();
    }

    handleFile(event) {
        if (!event.target.files?.length) {
            this.toastrService.error(`Please select files.`);
            return;
        }

        let promises = [];
        for (let idx = 0; event.target.files[idx]; idx++) {
            const file = event.target.files[idx];
            promises.push(
                new Promise((resolve, reject) => {
                    checkFile(file, 2).subscribe((res) => {
                        if (res) {
                            this.toastrService.error(res.message);
                            reject();
                        } else {
                            resolve(file);
                        }
                    });
                }),
            );
        }

        Promise.all(promises)
            .then(() => {
                promises = [];
                for (let idx = 0; event.target.files[idx]; idx++) {
                    const file = event.target.files[idx];
                    const formData: FormData = new FormData();
                    formData.append('file', file, file.name);
                    formData.append('name', moment().format('YYYYMMDDHHmmss') + '.' + file.name.split('.').pop());
                    formData.append('file_module', FileModule.Gallery);
                    promises.push(
                        new Promise((resolve, reject) => {
                            this.fileService.uploadFiles(formData).subscribe(
                                (res: any) => {
                                    if (res.success) {
                                        resolve(res.success);
                                    } else {
                                        reject();
                                    }
                                },
                                (err) => {
                                    reject();
                                },
                            );
                        }),
                    );
                }

                Promise.all(promises)
                    .then(() => {
                        this.toastrService.success('Items are uploaded successfully');
                        event.target.value = '';
                        this.getFiles();
                    })
                    .catch(() => {
                        this.toastrService.error('Error while uploading');
                        event.target.value = '';
                    });
            })
            .catch(() => {
                event.target.value = '';
            });
    }

    preview(item) {
        this.dialogSrv.open(MediaPreviewComponent, { data: { record: item } });
    }
}
