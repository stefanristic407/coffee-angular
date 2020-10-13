// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains function to Save Roastery Logo.
import { Injectable } from "@angular/core";
import { ImageCropperComponent } from "ngx-image-cropper";

@Injectable({
  providedIn: "root"
})
export class RoasterProfileService {
  roasterImage: any;
  imageChangedEvent: any = "";
  croppedImage: any = "assets/images/profile.svg";
  imageCropper: ImageCropperComponent;
  displayModal: boolean = false;
  deleteLogo: boolean = false;
  constructor() {}

  //  Function Name : Save Roastery Logo.
  //Description: This function helps to save the roastery logo.
  saveRoasterPic() {
    this.imageCropper.crop();
    this.displayModal = false;
    this.deleteLogo = true;
  }
  deletePhoto(){
    this.croppedImage= "assets/images/profile.svg";
    this.deleteLogo = false;
  }
}
