import { Component, OnInit , ViewChild} from '@angular/core';
import { Dimensions, ImageCroppedEvent, ImageCropperComponent, ImageTransform } from "ngx-image-cropper";
import { ProfilePicService } from './profile-pic.service';

@Component({
  selector: 'sewn-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.css']
})
export class ProfilePicComponent implements OnInit {

  @ViewChild(ImageCropperComponent, { static: false })
  imageCropper: ImageCropperComponent;
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  constructor(public profilePicService : ProfilePicService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.profilePicService.imageCropper = this.imageCropper;
  }

  //  Function Name : Image Cropped.
  //  Description   : This function gives the output of cropped image.
  imageCropped(event: ImageCroppedEvent) {
    this.profilePicService.croppedImage = event.base64;
    // console.log(this.profilePicService.croppedImage)
  }

  //  Function Name : Loading Image.
  //  Description   : This function helps load the picture inside modal.
  imageLoaded() {
    this.showCropper = true;
    console.log("Image loaded");
  }

  //  Function Name : Image Cropping.
  //  Description   : This function helps to crop the image.
  cropperReady(sourceImageDimensions: Dimensions) {
    console.log("Cropper ready", sourceImageDimensions);
  }
  //  Function Name : Image Failed.
  //  Description   : This function gives confirmation of image failed.
  loadImageFailed() {
    console.log("Load failed");
  }

  //  Function Name : Slider Function.
  //  Description   : This is slider functionality.
  zoom() {
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }
}
