import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GlobalsService } from '@services';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { dataURItoBlob } from '@utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-cropper-dialog',
    templateUrl: './cropper-dialog.component.html',
    styleUrls: ['./cropper-dialog.component.scss'],
})
export class CropperDialogComponent implements OnInit {
    // imageChangedEvent: any = '';
    croppedImgUrl: any = '';
    cropperConfig = {
        imageChangedEvent: null,
        imageBase64: null,
        format: 'png',
        aspectRatio: 1 / 1,
        maintainAspectRatio: true,
    };

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        public globals: GlobalsService,
        private translateService: TranslateService,
    ) {
        this.cropperConfig = {
            ...this.cropperConfig,
            ...this.config.data,
        };
        this.config.header = this.translateService.instant('edit_photo');
        this.config.styleClass = 'cropper-dialog';
    }

    ngOnInit(): void {}

    onFileChange(event: any): void {
        if (!event.target.files?.length) {
            return;
        }
        this.cropperConfig.imageChangedEvent = event;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImgUrl = event.base64;
    }

    onSave(): void {
        this.ref.close({
            status: true,
            croppedImgUrl: this.croppedImgUrl,
            croppedImgFile: dataURItoBlob(this.croppedImgUrl),
        });
    }
}
