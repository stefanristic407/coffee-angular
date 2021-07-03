import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GlobalsService } from '@services';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { dataURItoBlob } from '@utils';

@Component({
    selector: 'app-rectangle-image-cropper-dialog',
    templateUrl: './rectangle-image-cropper-dialog.component.html',
    styleUrls: ['./rectangle-image-cropper-dialog.component.scss'],
})
export class RectangleImageCropperDialogComponent implements OnInit {
    imageChangedEvent: any = '';
    croppedImgUrl: any = '';

    constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, public globals: GlobalsService) {}

    ngOnInit(): void {
        this.imageChangedEvent = this.config.data.imageChangedEvent;
    }

    onFileChange(event: any): void {
        if (!event.target.files?.length) {
            return;
        }
        this.imageChangedEvent = event;
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
