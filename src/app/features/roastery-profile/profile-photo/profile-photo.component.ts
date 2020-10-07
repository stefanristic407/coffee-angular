import { Component, OnInit , ViewChild} from '@angular/core';
import { Dimensions, ImageCroppedEvent, ImageCropperComponent, ImageTransform } from "ngx-image-cropper";
import { ProfilePhotoService } from './profile-photo.service';
import {GlobalsService} from 'src/services/globals.service';

@Component({
  selector: 'sewn-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.css']
})
export class ProfilePhotoComponent implements OnInit {

  @ViewChild(ImageCropperComponent, { static: false })
  imageCropper: ImageCropperComponent;
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  appLanguage: any;

  constructor(public profilePhotoService : ProfilePhotoService,private globals: GlobalsService) {}

  ngOnInit(): void {
    this.appLanguage = this.globals.languageJson;
  }

  ngAfterViewInit(): void {
    this.profilePhotoService.imageCropper = this.imageCropper;
  }

  //  Function Name : Image Cropped.
  //  Description   : This function gives the output of cropped image.
  imageCropped(event: ImageCroppedEvent) {
    this.profilePhotoService.croppedImage = event.base64;
    console.log(event)
    console.log(this.profilePhotoService.croppedImage)
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
