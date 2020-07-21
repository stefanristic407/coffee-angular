import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfilePicService } from './profile-pic/profile-pic.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserserviceService } from 'src/services/users/userservice.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  @ViewChild("image") image;
  date6: Date;
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
  numb: string;
  roaster_id: string;
  nameSeperate: string[];
  firstname: string;
  lastname: string;
  numberValue: any;
  user_id: string;
  roasterId: string;
  city: any;
  country: any;
  state: any;
  timezone: any;
  language: any;
  address1: any;
  address2: any;
  gender: any;

  constructor(public profilePicService: ProfilePicService, 
    private router : Router, 
    private toastrService: ToastrService,
    private userService : UserserviceService,
    private roasterService : RoasterserviceService,
    private cookieService : CookieService) {
    this.roleError = '';
    this.phonenoError = '';
    this.emailError = '';
    this.descriptionError = '';
    this.nameError = '';
      this.roaster_id = this.cookieService.get('roaster_id');
  }

  ngOnInit(): void {
         // Select optons
         let selectedVal = "+91";
         let EnteredNum;
         let optionText = ['IND 91', 'USA 1', 'AUS 61', 'ITA 39', 'Ban 880', 'SWE 46','AFG 93', 'UK 44','UAE 971', 'CHE 41','SAU 966','PRT 351', 'PO 48', 'NOR 47', 'NZL 64','GER 49', 'FRA 33', 'DNK 45','CHN 86','PAK 92' ]
    // Phone Number selection
    let optionLen = $('.phone-number').find('.select-list');
            
    for(let i=0; i<optionText.length; i++) {
        let optionVal = '<li class="select-list__item">'+optionText[i]+'</li>'
        optionLen.append(optionVal)
    }
    
        $('.entered-number').on('input', function() {
          EnteredNum = $(this).val();
          let Num = '+' + parseInt( selectedVal+ EnteredNum);
          $(this).parents('.phone-number').find('.hidden-phone-num').val(Num);
          let s =$(this).parents('.phone-number').find('.hidden-phone-num').val();
          
          });
          
          $('body').on('click', '.select-list li', function() {
              let $thisVal = $(this).text();
              selectedVal = $thisVal.replace(/[^0-9]/gi,'');
              console.log(selectedVal)
              $(this).parents('.phone-number').find('.Selected-ISD').text('+' +  selectedVal)
              let Num = '+' + parseInt( selectedVal+EnteredNum);
          $(this).parents('.phone-number').find('.hidden-phone-num').val(Num);
              let s =$(this).parents('.phone-number').find('.hidden-phone-num').val()
              $(this).parents('.phone-number').find('.select-list').toggleClass('active');
              $('.Selected-ISD').toggleClass('active');
              
              // this.numb = String(Num);
              // console.log(this.numb)
          });
      
          $('.Selected-ISD').on('click', function() {
              $(this).toggleClass('active');
              $(this).parents('.phone-number').find('.select-list').toggleClass('active');
          });


          this.userService.getRoasterProfile(this.roaster_id).subscribe(
            response => {
              if(response['success']==true){
                console.log(response)
                this.name = response['result']['firstname']+" "+ response['result']['lastname'];
                this.email = response['result']['email'];
                this.city = response['result']['city'];
                this.country = response['result']['country'];
                this.state = response['result']['state'];
                this.language = response['result']['language'];
                this.timezone = response['result']['timezone'];
                this.address1 = response['result']['address1'];
                this.address2 = response['result']['address2'];
                this.gender = response['result']['gender'];
                this.numberValue =  response['result']['phone'].split("-");
                this.phoneno = this.numberValue[1];
                document.getElementById('finalNumber').innerHTML = this.numberValue[0];
                console.log(this.numberValue)
                this.date6 = response['result']['date_of_birth'];
                this.profilePicService.croppedImage = response['result']['profile_image_url'];
                this.profilePicService.deleteLogo  = true;
                this.roasterService.getUserBasedRoles(this.roaster_id, response['result']['id']).subscribe(
                  roleData => {
                    if(roleData['success']==true){
                      this.role = roleData['result'][0].name;
                    }
                    else{
                      this.toastrService.error("Error while fetching role");
                    }
                  }
                )
              }
              else{
                this.toastrService.error("Error while fetching the user details");
              }
            }
          )
      
  }


  //  Function Name : Profile Image function.
  //  Description   : This function helps to trigger click event of upload image.
  showModalDialog() {
    this.image.nativeElement.click();
  }
  //  Function Name : Handle Profile File function.
  //  Description   : This function helps To open file explorer,after selecting image it will open Image Cropper Modal.
  handleFile(e) {
    if (e.target.files.length > 0) { 
			for (let i = 0; i <= e.target.files.length - 1; i++) { 

				const fsize = e.target.files.item(i).size; 
				const file = Math.round((fsize / 1024)); 
				// The size of the file. 
      if (file >= 2048) {
        // alert("file is big")
        this.toastrService.error("File too big, please select a file smaller than 2mb");
        this.profilePicService.displayModal = false;
      }
      else{ 
    this.profilePicService.displayModal = true;
    this.profilePicService.imageChangedEvent = e;
      }
    }
  }
  }

  //  Function Name : Close Profile Modal.
  //  Description   : This function helps to close profile Image Cropper modal.
  closeProfileModal() {
    // this.profileImageService.croppedImage = "assets/images/profile.svg";
    this.profilePicService.displayModal = false;
  }


   b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

  onKeyPress(event: any) {
    if (event.target.value == "") {
      document.getElementById(event.target.id).style.border = "1px solid #D50000";
    } else {
      document.getElementById(event.target.id).style.border = "1px solid #d6d6d6";
    }
  }
  profileSave() {
    this.numb = document.getElementById('finalNumber').innerHTML +"-"+ this.phoneno;
    console.log(this.numb);

    this.nameSeperate = this.name.split(" ");
    this.firstname = this.nameSeperate[0];
    this.lastname = this.nameSeperate[1];
    

    if( this.name == "" && this.email == "" && this.phoneno == null
      && this.role == ""){
        $(".myAlert-top").show();
        this.nameError  = "Please fill the mandatory details";
        this.emailError = "Please fill the mandatory details";
        this.phonenoError = "Please fill the mandatory details";
        this.roleError = "Please fill the mandatory details";
        document.getElementById("name").style.border =
          "1px solid #D50000";
          document.getElementById("email").style.border =
          "1px solid #D50000";
          document.getElementById("phone").style.border =
          "1px solid #D50000";
          document.getElementById("role").style.border =
          "1px solid #D50000";
        setTimeout(() => {
          this.nameError = "";
          this.emailError = "";
          this.phonenoError = "";
          this.roleError = "";
        }, 3000);
    }
    else if (this.name == "" || this.name == null || this.name == undefined) {
      this.nameError = "Please enter your name";
      document.getElementById('name').style.border = "1px solid #D50000";
      setTimeout(() => {
        this.nameError = "";
      }, 3000);
    } 
    // else if (this.description == "" || this.description == null || this.description == undefined) {
    //   this.descriptionError = "Please enter a description";
    //   document.getElementById('description').style.border = "1px solid #D50000";
    //   setTimeout(() => {
    //     this.descriptionError = "";
    //   }, 3000);

    // }
     else if (this.email == "" || this.email == null || this.email == undefined) {
      this.emailError = "Please enter valid email";
      document.getElementById('email').style.border = "1px solid #D50000";
      setTimeout(() => {
        this.emailError = "";
      }, 3000);

    }
    else if (this.phoneno == null || this.phoneno == undefined) {
      this.phonenoError = "Please enter valid phone number";
      document.getElementById('phoneno').style.border = "1px solid #D50000";
      setTimeout(() => {
        this.phonenoError = "";
      }, 3000);

    }  
    else{
      var d = new Date(this.date6),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  var dateValue =  [year, month, day].join('-');
  console.log(dateValue);
      var data = {
        'firstname' : this.firstname,
        'lastname' : this.lastname ,
        'phone' : this.numb,
        'date_of_birth' : dateValue,
        'state' : this.state,
        'language' : this.language,
        'timezone' : this.timezone,
        'country' : this.country,
        'city' : this.city,
        'address1' : this.address1,
        'address2' : this.address2,
        'gender' : this.gender

       };
       console.log(data)
       this.userService.updateRoasterProfile(this.roaster_id,data).subscribe(
         result => {
           console.log(result)
           this.roasterId = this.cookieService.get('roaster_id');
           this.user_id = this.cookieService.get('user_id');
           if(result['success'] == true){
            console.log(this.profilePicService.croppedImage)
            var base64Rejex = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;
            var isBase64Valid = base64Rejex.test(this.profilePicService.croppedImage); // base64Data is the base64 string

            if(!isBase64Valid){
              this.toastrService.success("Profile details updated successfully");
              this.router.navigate(['/features/account-settings']);
            }else{

           

            var ImageURL = this.profilePicService.croppedImage;
             // Split the base64 string in data and contentType
            var block = ImageURL.split(";");
            // Get the content type of the image
            var contentType = block[0].split(":")[1];// In this case "image/gif"
            // get the real base64 content of the file
            var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."
            
            // Convert it to a blob to upload
            var blob = this.b64toBlob(realData, contentType,0);
            
            let formData: FormData = new FormData();
            formData.append("file", blob);
            formData.append(
              "api_call",
              "/ro/" + this.roasterId + "/users/" + this.user_id + "/profile-image"
            );
            formData.append("token", this.cookieService.get("Auth"));
            this.userService.uploadProfileImage(formData).subscribe(
              result => {
                console.log(result)
                if(result['success']== true){
                this.toastrService.success("Profile details updated successfully");
                this.router.navigate(['/features/account-settings']);
                }
                else{
                  console.log(result);
                  this.toastrService.error("Error while updating details, please try again.")
                }
              }
            )
          }
           }
           else{
             this.toastrService.error("Error while updating details, please try again.")
           }
         }
       )

      
    }
  }


}
