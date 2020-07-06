import { Injectable } from '@angular/core';
import { ImageCropperComponent } from 'ngx-image-cropper';

@Injectable({
  providedIn: 'root'
})
export class ProfilePicService {
  image: any;
  imageChangedEvent: any = "";
  croppedImage: any = "assets/images/profile.svg";
  imageCropper: ImageCropperComponent;
  displayModal: boolean = false;
  deleteLogo : boolean = false;
  constructor() {}
  //  Function Name : Save Facilitator Logo.
  //  Description   : This function helps to save the Facilitator logo.
  saveProfilePic() {
    this.imageCropper.crop();
    this.displayModal = false;
    this.deleteLogo  = true;
    console.log(this.croppedImage);
  }
  deletePhoto(){
    this.croppedImage= "assets/images/profile.svg";
    this.deleteLogo = false;
  }
}
