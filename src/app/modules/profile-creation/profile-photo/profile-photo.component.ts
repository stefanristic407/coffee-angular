import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Dimensions, ImageCroppedEvent, ImageCropperComponent, ImageTransform } from 'ngx-image-cropper';
import { ProfilePhotoService } from './profile-photo.service';
import { RoasteryProfileService } from '../roastery-profile.service';

@Component({
    selector: 'app-sewn-profile-photo',
    templateUrl: './profile-photo.component.html',
    styleUrls: ['./profile-photo.component.scss'],
})
export class ProfilePhotoComponent implements OnInit, AfterViewInit {
    @ViewChild(ImageCropperComponent, { static: false })
    imageCropper: ImageCropperComponent;
    canvasRotation = 0;
    rotation = 0;
    scale = 1;
    showCropper = false;
    containWithinAspectRatio = false;
    transform: ImageTransform = {};
    imageChangedEvent: any = '';

    constructor(
        public profilePhotoService: ProfilePhotoService,
        public roasteryProfileService: RoasteryProfileService,
    ) {}

    ngOnInit(): void {
        this.roasteryProfileService.avatarImageChanged$.subscribe((res: any) => {
            if (res) {
                this.imageChangedEvent = res;
            }
        });
    }

    ngAfterViewInit(): void {
        this.profilePhotoService.imageCropper = this.imageCropper;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.profilePhotoService.croppedImage = event.base64;
    }

    imageLoaded() {
        this.showCropper = true;
        console.log('Image loaded');
    }

    loadImageFailed() {
        console.log('Load failed');
    }

    zoom() {
        this.transform = {
            ...this.transform,
            scale: this.scale,
        };
    }
}
