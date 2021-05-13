// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains function to Save Profile image.
import { Injectable } from "@angular/core";
import { ImageCropperComponent } from "ngx-image-cropper";

@Injectable({
  providedIn: "root"
})
export class ProfileImageService {
  image: any;
  imageChangedEvent: any = "";
  croppedImage: any = "assets/images/profile.svg";
  imageCropper: ImageCropperComponent;
  displayModal: boolean = false;
  deleteLogo : boolean = false;
  constructor() {}

  //  Function Name : Save Profile Image.
  //Description: This function helps to save the profile image.
  saveProfilePic() {
    this.imageCropper.crop();
    this.displayModal = false;
    this.deleteLogo = true;
    console.log(this.croppedImage);
  }
  deletePhoto(){
    this.croppedImage= "assets/images/profile.svg";
    this.deleteLogo = false;
  }
}
