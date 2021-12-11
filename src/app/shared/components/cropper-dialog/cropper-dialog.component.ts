import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalsService } from '@services';
import { dataURItoBlob } from '@utils';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-cropper-dialog',
    templateUrl: './cropper-dialog.component.html',
    styleUrls: ['./cropper-dialog.component.scss'],
})
export class CropperDialogComponent implements OnInit {
    croppedImgUrl: any = '';
    cropperConfig = {
        imageChangedEvent: null,
        imageBase64: null,
        format: 'png',
        aspectRatio: 1 / 1,
        maintainAspectRatio: true,
        resizeToWidth: 0,
        resizeToHeight: 0,
        roundCropper: false,
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
