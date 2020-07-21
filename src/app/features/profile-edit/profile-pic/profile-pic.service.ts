import { Injectable } from '@angular/core';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { UserserviceService } from 'src/services/users/userservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

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
  userId: string;
  roasterId: string;
  constructor(private userService : UserserviceService, private cookieService : CookieService,
              private toastrService : ToastrService) {
                this.userId = this.cookieService.get('user_id');
                this.roasterId = this.cookieService.get('roaster_id');
              }
  //  Function Name : Save Facilitator Logo.
  //  Description   : This function helps to save the Facilitator logo.
  saveProfilePic() {
    this.imageCropper.crop();
    this.displayModal = false;
    this.deleteLogo  = true;
    console.log(this.croppedImage);
  }
  deletePhoto(){
    this.userService.deleteProfileImage(this.userId,this.roasterId).subscribe(
      result =>{
        if(result['success']==true){
          this.toastrService.success("the profile image is deleted successfully");
          this.croppedImage= "assets/images/profile.svg";
          this.deleteLogo = false;
        }
        else{
          this.toastrService.error("Something went wrong while deleting your profile picture!.");
          this.deleteLogo = true;
        }
      }
    )

  }
}
