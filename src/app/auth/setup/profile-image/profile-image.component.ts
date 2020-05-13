import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { Dimensions, ImageCroppedEvent, ImageTransform,base64ToFile, ImageCropperComponent } from 'ngx-image-cropper';
import { ProfileImageService } from './profile-image.service';
@Component({
  selector: 'sewn-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent implements OnInit,AfterViewInit {
  @ViewChild(ImageCropperComponent, {static:false}) imageCropper : ImageCropperComponent;
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  constructor(public profileImageService : ProfileImageService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.profileImageService.imageCropper = this.imageCropper;
  }


  imageCropped(event: ImageCroppedEvent) {
    this.profileImageService.croppedImage = event.base64;
}

imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
}

cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
}

loadImageFailed() {
    console.log('Load failed');
}

zoom(){
 
  this.transform = {
    ...this.transform,
    scale: this.scale
};
}


}
