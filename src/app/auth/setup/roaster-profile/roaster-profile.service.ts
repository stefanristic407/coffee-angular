import { Injectable } from '@angular/core';
import { ImageCropperComponent } from 'ngx-image-cropper';

@Injectable({
  providedIn: 'root'
})
export class RoasterProfileService {
  roasterImage: any;
  imageChangedEvent: any = '';
  croppedImage: any = 'assets/images/roaster_logo.svg';
  imageCropper: ImageCropperComponent;
  displayModal: boolean = false;
  constructor() { }

  saveRoasterPic() {
    this.imageCropper.crop();
    this.displayModal = false;
  }
}
