import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageCroppedEvent, ImageTransform, ImageCropperComponent, Dimensions } from 'ngx-image-cropper';
import { RoasterProfileService } from './roaster-profile.service';

@Component({
  selector: 'sewn-roaster-profile',
  templateUrl: './roaster-profile.component.html',
  styleUrls: ['./roaster-profile.component.css']
})
export class RoasterProfileComponent implements OnInit {
  @ViewChild(ImageCropperComponent, {static:false}) imageCropper : ImageCropperComponent;
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  constructor(public roasterService : RoasterProfileService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.roasterService.imageCropper = this.imageCropper;
  }


  imageCropped(event: ImageCroppedEvent) {
    this.roasterService.croppedImage = event.base64;
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
