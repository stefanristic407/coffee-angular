import { Injectable } from '@angular/core';
import { ImageCropperComponent } from 'ngx-image-cropper';

@Injectable({
  providedIn: 'root'
})
export class ProfilePhotoService {
  image: any;
  imageChangedEvent: any = "";
  croppedImage: any = "assets/images/oval.svg";
  imageCropper: ImageCropperComponent;
  displayModal: boolean = false;
  constructor() {}
  //  Function Name : Save Facilitator Logo.
  //  Description   : This function helps to save the Facilitator logo.
  saveProfilePic() {
    this.imageCropper.crop();
    this.displayModal = false;
  }
 
}
