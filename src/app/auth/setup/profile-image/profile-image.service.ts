import { Injectable } from '@angular/core';
import { ImageCropperComponent } from 'ngx-image-cropper';

@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {
  image : any;
  imageChangedEvent:any ='';
  croppedImage:any='assets/images/profile.svg';
  imageCropper : ImageCropperComponent;
  displayModal :boolean = false;
  constructor() { }

  saveProfilePic(){
    this.imageCropper.crop();  
    this.displayModal = false; 
  }
}
