import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfilePicService } from './profile-pic/profile-pic.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  @ViewChild("image") image;
  date3: Date;
  role: string;
  phoneno: number;
  email: string;
  description: string;
  name: string;

  roleError: string;
  phonenoError: string;
  emailError: string;
  descriptionError: string;
  nameError: string;

  constructor(public profilePicService: ProfilePicService) {
    this.roleError = '';
    this.phonenoError = '';
    this.emailError = '';
    this.descriptionError = '';
    this.nameError = '';

  }

  ngOnInit(): void {
  }


  //  Function Name : Profile Image function.
  //  Description   : This function helps to trigger click event of upload image.
  showModalDialog() {
    this.image.nativeElement.click();
  }
  //  Function Name : Handle Profile File function.
  //  Description   : This function helps To open file explorer,after selecting image it will open Image Cropper Modal.
  handleFile(e) {
    this.profilePicService.displayModal = true;
    this.profilePicService.imageChangedEvent = e;
  }

  //  Function Name : Close Profile Modal.
  //  Description   : This function helps to close profile Image Cropper modal.
  closeProfileModal() {
    // this.profileImageService.croppedImage = "assets/images/profile.svg";
    this.profilePicService.displayModal = false;
  }

  onKeyPress(event: any) {
    if (event.target.value == "") {
      document.getElementById(event.target.id).style.border = "1px solid #FD4545";
    } else {
      document.getElementById(event.target.id).style.border = "1px solid #E8E8E8";
    }
  }
  profileSave() {

    if (this.name == "" || this.name == null || this.name == undefined) {
      this.nameError = "Please enter your name";
      document.getElementById('name').style.border = "1px solid #FD4545";
      setTimeout(() => {
        this.nameError = "";
      }, 3000);
    } else if (this.description == "" || this.description == null || this.description == undefined) {
      this.descriptionError = "Please enter a description";
      document.getElementById('description').style.border = "1px solid #FD4545";
      setTimeout(() => {
        this.descriptionError = "";
      }, 3000);

    }
     else if (this.email == "" || this.email == null || this.email == undefined) {
      this.emailError = "Please enter valid email";
      document.getElementById('email').style.border = "1px solid #FD4545";
      setTimeout(() => {
        this.emailError = "";
      }, 3000);

    }
    else if (this.phoneno == null || this.phoneno == undefined) {
      this.phonenoError = "Please enter valid phone number";
      document.getElementById('phoneno').style.border = "1px solid #FD4545";
      setTimeout(() => {
        this.phonenoError = "";
      }, 3000);

    }  else if (this.role == "" || this.role == null || this.role == undefined) {
      this.roleError = "Please enter role";
      document.getElementById('role').style.border = "1px solid #FD4545";
      setTimeout(() => {
        this.roleError = "";
      }, 3000);

    }
  }


}
