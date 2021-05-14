// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains function to Save Profile Image.
import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";

import {
  Dimensions,
  ImageCroppedEvent,
  ImageTransform,
  base64ToFile,
  ImageCropperComponent
} from "ngx-image-cropper";
import { ProfileImageService } from "./profile-image.service";
@Component({
  selector: "sewn-profile-image",
  templateUrl: "./profile-image.component.html",
  styleUrls: ["./profile-image.component.css"]
})
export class ProfileImageComponent implements OnInit, AfterViewInit {
  @ViewChild(ImageCropperComponent, { static: false })
  imageCropper: ImageCropperComponent;
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  constructor(public profileImageService: ProfileImageService) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.profileImageService.imageCropper = this.imageCropper;
  }

  //  Function Name : Image Cropped.
  //Description: This function gives the output of cropped image.
  imageCropped(event: ImageCroppedEvent) {
    this.profileImageService.croppedImage = event.base64;
  }
  //  Function Name : Loading Image.
  //Description: This function helps load the picture inside modal.
  imageLoaded() {
    this.showCropper = true;
    console.log("Image loaded");
  }

  //  Function Name :Image Cropping.
  //Description: This function helps to crop the image.
  cropperReady(sourceImageDimensions: Dimensions) {
    console.log("Cropper ready", sourceImageDimensions);
  }

  //  Function Name :Image Failed.
  //Description: This function gives confirmation of image failed.

  loadImageFailed() {
    alert("Load failed");
  }

  //  Function Name :Slider Function.
  //Description: This is slider functionality.

  zoom() {
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }
}
