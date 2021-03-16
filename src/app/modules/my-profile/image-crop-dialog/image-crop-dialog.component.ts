import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Dimensions, ImageCroppedEvent, ImageCropperComponent, ImageTransform } from 'ngx-image-cropper';
import { MyProfileService } from '@modules/my-profile/my-profile.service';

@Component({
    selector: 'app-image-crop-dialog',
    templateUrl: './image-crop-dialog.component.html',
    styleUrls: ['./image-crop-dialog.component.scss'],
})
export class ImageCropDialogComponent implements OnInit, AfterViewInit {
    @ViewChild(ImageCropperComponent, { static: false })
    imageCropper?: ImageCropperComponent;
    canvasRotation = 0;
    rotation = 0;
    scale = 1;
    showCropper = false;
    containWithinAspectRatio = false;
    transform: ImageTransform = {};
    appLanguage?: any;

    constructor(public myProfileService: MyProfileService) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.myProfileService.imageCropper = this.imageCropper;
    }

    imageCropped(event: ImageCroppedEvent): void {
        this.myProfileService.croppedImage = event.base64;
    }

    //  Function Name : Loading Image.
    //  Description   : This function helps load the picture inside modal.
    imageLoaded(): void {
        this.showCropper = true;
    }

    cropperReady(sourceImageDimensions: Dimensions): void {}

    loadImageFailed(): void {}

    zoom(): void {
        this.transform = {
            ...this.transform,
            scale: this.scale,
        };
    }
}
