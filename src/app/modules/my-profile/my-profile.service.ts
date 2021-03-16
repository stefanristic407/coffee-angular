import { EventEmitter, Injectable } from '@angular/core';
import { ImageCropperComponent } from 'ngx-image-cropper';

@Injectable({
    providedIn: 'root',
})
export class MyProfileService {
    imageChangedEvent?: any;
    imageCropper?: ImageCropperComponent;
    croppedImage: any = 'assets/images/oval.svg';
    displayCropImageDialog?: boolean;
    profilePictureSavedEvent: EventEmitter<any>;

    constructor() {
        this.profilePictureSavedEvent = new EventEmitter<any>();
    }

    saveProfilePicture(): void {
        this.imageCropper?.crop();
        this.displayCropImageDialog = false;
        console.log('cropped >>>>>>>>>>>', this.croppedImage);
        this.profilePictureSavedEvent.emit();
    }
}
