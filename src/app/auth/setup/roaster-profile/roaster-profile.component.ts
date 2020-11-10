// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains function to Save Roastery Logo.
import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import {
  Dimensions,
  ImageCroppedEvent,
  ImageTransform,
  ImageCropperComponent
} from "ngx-image-cropper";
import { RoasterProfileService } from "./roaster-profile.service";
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: "sewn-roaster-profile",
  templateUrl: "./roaster-profile.component.html",
  styleUrls: ["./roaster-profile.component.css"]
})
export class RoasterProfileComponent implements OnInit, AfterViewInit {
  @ViewChild(ImageCropperComponent, { static: false })
  imageCropper: ImageCropperComponent;
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  appLanguage?: any;

  constructor(public roasterService: RoasterProfileService,    private globals: GlobalsService
    ) {}

  ngOnInit(): void {
    this.appLanguage = this.globals.languageJson;

  }
  ngAfterViewInit(): void {
    this.roasterService.imageCropper = this.imageCropper;
  }

  //  Function Name : Image Cropped.
  //Description: This function gives the output of cropped image.
  imageCropped(event: ImageCroppedEvent) {
    this.roasterService.croppedImage = event.base64;
  }

  //  Function Name : Loading Image.
  //Description: This function helps load the picture inside modal.
  imageLoaded() {
    this.showCropper = true;
    console.log("Image loaded");
  }

  //  Function Name : Image Cropping.
  //Description: This function helps to crop the image.
  cropperReady(sourceImageDimensions: Dimensions) {
    console.log("Cropper ready", sourceImageDimensions);
  }

  //  Function Name : Image Failed.
  //Description: This function gives confirmation of image failed.

  loadImageFailed() {
    console.log("Load failed");
  }

  //  Function Name : Slider Function.
  //Description: This is slider functionality.
  zoom() {
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }
}
