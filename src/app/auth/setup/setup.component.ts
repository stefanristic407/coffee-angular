// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Onboarding Roaster Setup.
import { Component, OnInit, ViewChild } from "@angular/core";
import { ImageCropperComponent } from "ngx-image-cropper";
import { ProfileImageService } from "./profile-image/profile-image.service";
import { RoasterProfileService } from "./roaster-profile/roaster-profile.service";
import { SetupService } from "./setup.service";

import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { stringify } from '@angular/compiler/src/util';
declare var $: any;
@Component({
  selector: "app-setup",
  templateUrl: "./setup.component.html",
  styleUrls: ["./setup.component.css"]
})
export class SetupComponent implements OnInit {
  @ViewChild("image") image;
  @ViewChild("roasterImage") roasterImage;


  mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  phonenoFormat = /^\d{10}$/;
  pwdFormat = /^([a-zA-Z0-9@#$%^&+=*.\-_]){7,14}$/;

  firstname: string;
  lastname: string;
  name: string;
  email: string;
  phoneNo: string;
  password: string;
  role: number;
  lastnameError: string;
  firstnameError: string;
  nameError: string;
  emailError: string;
  phoneNoError: string;
  passwordError: string;
  roleError: string;

  //RoasterDetails
  roaster_name: string;
  roaster_email: string;
  roaster_phone: string;
  country: any = "";
  state: string = "";
  address1: string;
  address2: string;
  city: string;
  zip_code: string;
  founded_year: string = "";
  website: string;
  short_descr: string;
  facebook_url: string;
  instagram_url: string;

  roasterNameError: string;
  roasterEmailError: string;
  roasterPhoneError: string;
  countryError: string;
  stateError: string;
  address1Error: string;
  address2Error: string;
  cityError: string;
  zipCodeError: string;
  foundedYearError: string;
  websiteError: string;
  shortDescrError: string;
  facebookError: string;
  instagramError: string;
  roles: any[] = [];

  firstButtonValue: any;
  secondButtonValue: any;
  new_user_email: string;
  numb: string;
  user_id: string;
  file_id: any;
  appLanguage?: any;
  tokenData: string;

  constructor(
    public profileImageService: ProfileImageService,
    public roasterService: RoasterProfileService,
    public setupService: SetupService,
    public userService: UserserviceService,
    private cookieService: CookieService,
    private _roleService: RoasterserviceService,
    private toastrService: ToastrService,
    private router: Router,
    private globals: GlobalsService,
    private route : ActivatedRoute
  ) {
    this.nameError = "";
    this.firstnameError = "";
    this.lastnameError = "";
    this.emailError = "";
    this.phoneNoError = "";
    this.passwordError = "";
    this.roleError = "";

    this.roasterNameError = "";
    this.roasterEmailError = "";
    this.roasterPhoneError = "";
    this.countryError = "";
    this.stateError = "";
    this.address1Error = "";
    this.address2Error = "";
    this.cityError = "";
    this.zipCodeError = "";
    this.foundedYearError = "";
    this.websiteError = "";
    this.shortDescrError = "";
    this.facebookError = "";
    this.instagramError = "";

  
  
  }

  ngOnInit(): void {
    //Auth Checking
    // if (this.cookieService.get("Auth") == "") {
    //   this.router.navigate(["/auth/login"]);
    // }
    var language = "en";
    this.userService.getUserLanguageStrings(language).subscribe(
      resultLanguage => {
        this.globals.languageJson = resultLanguage;
        console.log(this.globals.languageJson);
        this.appLanguage = this.globals.languageJson;
      }
    )

      this.tokenData = String(decodeURIComponent(this.route.snapshot.queryParams['token']));
    // this.listRoles();

    this.firstButtonValue = "Next";
    this.secondButtonValue = "Next";
    //  Function Name : Password Indicator function.
    //  Description   : This function helps to Indicate that the entering password is meeting the Password policies.
    $("input#password").on("focus keyup", function() {});
    $("input#password").blur(function() {});
    $("input#password").on("focus keyup", function() {
      var score = 0;
      var a = $(this).val();
      var desc = new Array();

      // strength desc
      desc[0] = "Too short";
      desc[1] = "Weak";
      desc[2] = "Good";
      desc[3] = "Strong";
      desc[4] = "Best";
    });

    $("input#password").blur(function() {});
    $("input#password").on("focus keyup", function() {
      var score = 0;
      var a = $(this).val();
      var desc = new Array();

      // strength desc
      desc[0] = "Too short";
      desc[1] = "Weak";
      desc[2] = "Good";
      desc[3] = "Strong";
      desc[4] = "Best";

      // password length
      if (a.length >= 6) {
        $("#length")
          .removeClass("invalid")
          .addClass("valid");
        score++;
      } else {
        $("#length")
          .removeClass("valid")
          .addClass("invalid");
      }

      // at least 1 digit in password
      if (a.match(/\d/)) {
        $("#pnum")
          .removeClass("invalid")
          .addClass("valid");
        score++;
      } else {
        $("#pnum")
          .removeClass("valid")
          .addClass("invalid");
      }

      // at least 1 capital & lower letter in password
      if (a.match(/[A-Z]/) && a.match(/[a-z]/)) {
        $("#capital")
          .removeClass("invalid")
          .addClass("valid");
        score++;
      } else {
        $("#capital")
          .removeClass("valid")
          .addClass("invalid");
      }

      // at least 1 special character in password {
      if (a.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) {
        $("#spchar")
          .removeClass("invalid")
          .addClass("valid");
        score++;
      } else {
        $("#spchar")
          .removeClass("valid")
          .addClass("invalid");
      }

      if (a.length > 0) {
        //show strength text
        $("#passwordDescription").text(desc[score]);
        // show indicator
        $("#passwordStrength")
          .removeClass()
          .addClass("strength" + score);
      } else {
        $("#passwordDescription").text("Password not entered");
        $("#passwordStrength")
          .removeClass()
          .addClass("strength" + score);
      }
    });

    $("input#password").blur(function() {});
    $("input#password").on("focus keyup", function() {
      var score = 0;
      var a = $(this).val();
      var desc = new Array();

      // strength desc
      desc[0] = "Too short";
      desc[1] = "Weak";
      desc[2] = "Good";
      desc[3] = "Strong";
      desc[4] = "Best";

      $("#pwd_strength_wrap").fadeIn(400);

      // password length
      if (a.length >= 6) {
        $("#length")
          .removeClass("invalid")
          .addClass("valid");
        score++;
      } else {
        $("#length")
          .removeClass("valid")
          .addClass("invalid");
      }

      // at least 1 digit in password
      if (a.match(/\d/)) {
        $("#pnum")
          .removeClass("invalid")
          .addClass("valid");
        score++;
      } else {
        $("#pnum")
          .removeClass("valid")
          .addClass("invalid");
      }

      // at least 1 capital & lower letter in password
      if (a.match(/[A-Z]/) && a.match(/[a-z]/)) {
        $("#capital")
          .removeClass("invalid")
          .addClass("valid");
        score++;
      } else {
        $("#capital")
          .removeClass("valid")
          .addClass("invalid");
      }

      // at least 1 special character in password {
      if (a.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) {
        $("#spchar")
          .removeClass("invalid")
          .addClass("valid");
        score++;
      } else {
        $("#spchar")
          .removeClass("valid")
          .addClass("invalid");
      }

      if (a.length > 0) {
        //show strength text
        $("#passwordDescription").text(desc[score]);
        // show indicator
        $("#passwordStrength")
          .removeClass()
          .addClass("strength" + score);
      } else {
        $("#passwordDescription").text("Password not entered");
        $("#passwordStrength")
          .removeClass()
          .addClass("strength" + score);
      }
    });

    $("input#password").blur(function() {
      $("#pwd_strength_wrap").fadeOut(400);
    });


    // $(function () {
    //   $(".menu").sortable({
    //       items: '> .menuSort'
    //   });
    // });

    // setTimeout(()=>{
    //   let country_id = document.getElementById('country');
    //   country_id.classList.add('country_placeholder');
    // },500)

      // Select optons
      let selectedVal = +91;
      let EnteredNum;
      let optionText = ['IND 91', 'USA 1', 'AUS 61', 'ITA 39', 'Ban 880', 'SWE 46','AFG 93', 'UK 44','UAE 971', 'CHE 41','SAU 966','PRT 351', 'PO 48', 'NOR 47', 'NZL 64','GER 49', 'FRA 33', 'DNK 45','CHN 86','PAK 92']
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
   
  }

  // ngAfterViewChecked(){
  //   let country_id = document.getElementById('country');
  //   country_id.classList.remove('country_placeholder');
  // }

  onKeyPress(event: any) {
    if (event.target.value != "") {
      document.getElementById(event.target.id).style.border =
        "1px solid #d6d6d6";
    // } else {
    //   document.getElementById(event.target.id).style.border =
    //     "1px solid #d50000";
    }
  }

  //  Function Name : Profile Image function.
  //  Description   : This function helps to trigger click event of upload image.
  showModalDialog() {
    this.image.nativeElement.click();
  }
  //  Function Name : Roaster Logo function.
  //  Description   : This function helps to trigger click event of roaster logo.
  showRoasterModal() {
    this.roasterImage.nativeElement.click();
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
        this.profileImageService.displayModal = false;
      }
      else{ 
    this.profileImageService.displayModal = true;
    this.profileImageService.imageChangedEvent = e;
      }
    }
  }
  }

  //  Function Name : Handle Roaster File function.
  //  Description   : This function helps To open file explorer,after selecting roaster logo it will open Image Cropper Modal.
  handleRoasterFile(e) {
    if (e.target.files.length > 0) { 
			for (let i = 0; i <= e.target.files.length - 1; i++) { 

				const fsize = e.target.files.item(i).size; 
				const file = Math.round((fsize / 1024)); 
				// The size of the file. 
      if (file >= 2048) {
        this.toastrService.error("File too big, please select a file smaller than 2mb");
        this.roasterService.displayModal = false;
      }
      else{ 
    this.roasterService.displayModal = true;
    this.roasterService.imageChangedEvent = e;
      }
    }
  }
  }

  //  Function Name : Close Profile Modal.
  //  Description   : This function helps to close profile modal.
  closeProfileModal() {
    // this.profileImageService.croppedImage = "assets/images/profile.svg";
    this.profileImageService.displayModal = false;
  }

  //  Function Name : Close Roaster Modal.
  //  Description   : This function helps to close Roaster modal.
  closeRoasterModal() {
    // this.roasterService.croppedImage = "assets/images/roaster_logo.svg";
    this.roasterService.displayModal = false;
  }

  //  Function Name :Country Selection .
  // Description: To select a country.

  changeCountry() {
    // console.log("the selected country is : " + this.country);
    this.setupService.changeCountry(this.country);
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

  // listRoles(){
  //   this._roleService.getRoles().subscribe(
  //     response =>{
  //       if(response['success'] == true){
  //         this.roles = response['result'];
  //         this.role = this.roles[0].id;
  //         console.log(this.role)
  //       }
  //     })
  // }

  //  Function Name : Personal Details .
  // Description: This function helps to add personal details step1 in setup.

  personalDetails() {
    this.numb = document.getElementById('finalNumber').innerHTML + this.phoneNo;
    console.log(typeof this.numb);
    console.log("The final value of phone no: ", this.numb);
    if( (this.firstname == "" ) &&
    (this.email == "" ) &&
    (this.password == "")
    ){
      $(".myAlert-top").show();
      this.firstnameError = "Please fill the mandatory fields";
      this.emailError = "Please fill the mandatory fields";
      this.passwordError = "Please fill the mandatory fields";
      document.getElementById("firstname").style.border = "1px solid #D50000";
      document.getElementById("email").style.border = "1px solid #D50000";
      document.getElementById("password").style.border = "1px solid #D50000";
      setTimeout(() => {
        this.firstnameError = "";
        this.emailError = "";
        this.passwordError = "";
      }, 3000);
    }
    else if (
      this.firstname == "" ||
      this.firstname == null ||
      this.firstname == undefined
    ) {
      $(".myAlert-top").show();
      this.firstnameError = "Please enter your Firstname";
      document.getElementById("firstname").style.border = "1px solid #d50000";
      setTimeout(() => {
        this.firstnameError = "";
      }, 3000);
    }
    // else if(this.lastname == "" || this.lastname == null || this.lastname == undefined){
    //   $(".myAlert-top").show();
    //   this.lastnameError="Please enter your Lastname";
    //   document.getElementById('lastname').style.border="1px solid #FD4545";
    //   setTimeout(() => {
    //     this.lastnameError="";
    //   },3000);

    // }
    else if (
      this.email == "" ||
      this.email == null ||
      this.email == undefined
    ) {
      $(".myAlert-top").show();
      this.emailError = "Please enter your EmailID";
      document.getElementById("email").style.border = "1px solid #d50000";
      setTimeout(() => {
        this.emailError = "";
      }, 3000);
    } else if (!this.email.match(this.mailformat)) {
      $(".myAlert-top").show();
      this.emailError = "Please enter valid EmailID";
      document.getElementById("email").style.border = "1px solid #d50000";
      setTimeout(() => {
        this.emailError = "";
      }, 3000);
    }
    //   }else if(this.phoneNo == "" || this.phoneNo == null || this.phoneNo == undefined){
    //     $(".myAlert-top").show();
    //       this.phoneNoError="Please enter Phonenumber";
    //       document.getElementById('phone').style.border="1px solid #FD4545";
    //       setTimeout(() => {
    //         this.phoneNoError="";
    //       },3000);
    //   }else if(!(this.phoneNo.toString().match(this.phonenoFormat))){
    //     $(".myAlert-top").show();
    //     this.phoneNoError="Please valid Phonenumber";
    //     document.getElementById('phone').style.border="1px solid #FD4545";
    //     setTimeout(() => {
    //       this.phoneNoError="";
    //     },3000);
    // }
    else if (
      this.password == "" ||
      this.password == null ||
      this.password == undefined
    ) {
      $(".myAlert-top").show();
      this.passwordError = "Please enter password";
      document.getElementById("password").style.border = "1px solid #d50000";
      setTimeout(() => {
        this.passwordError = "";
      }, 3000);
    } else if (!this.password.match(this.pwdFormat)) {
      $(".myAlert-top").show();
      this.passwordError = "Password should be between 8 to 15 characters";
      document.getElementById("password").style.border = "1px solid #d50000";
      setTimeout(() => {
        this.passwordError = "";
      }, 3000);
    }
    // else if(this.role == null || this.role == undefined){
    //         this.roleError="Please select any role";
    //         document.getElementById('inputState').style.border="1px solid #FD4545";
    //         setTimeout(() => {
    //           this.roleError="";
    //         },3000);
    // }
    else {
      $(".myAlert-top").hide();
      this.firstButtonValue = "Loading";
   
         
          var ImageURL = this.profileImageService.croppedImage;
          console.log(ImageURL);
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
           "/invite/users/upload-image"
         );
         formData.append("inviteToken", this.tokenData);
         
         this.userService.uploadProfileImage(formData).subscribe(
          response => {
            console.log(response)
            if(response['success']== true){
              var data = {
                firstname: this.firstname,
                lastname: " ",
                email: this.email,
                password: this.password,
                confirm_password: this.password,
                file_id : response['result'].file_id,
                token : this.tokenData
              };
              console.log(data);
              this.cookieService.set('new_user_email',data.email);
              console.log("the data coming inside are :" + JSON.stringify(data));
     this.userService.personalDetails(data).subscribe(
            data =>{
              if(data['success']==true){
                this.cookieService.set("setupUserId", data["result"]["user_id"]);
                this.cookieService.set("authorization_key", data['Authorization'])
            console.log(data);
            this.firstButtonValue = "Next";
                console.log(this.cookieService.get('authorization_key'));
            $(".myAlert-top").hide();
            this.toastrService.success(
              "User details has been added successfully"
            );
            const firsttab = document.getElementById("first-tab");
            firsttab.classList.remove("current");
            const secondtab = document.getElementById("second-tab");
            secondtab.classList.add("current");
            const activenumber2 = document.getElementById("active1");
            activenumber2.classList.add("Member-tracker-active");
            activenumber2.classList.remove("step_focus");
            const fontActive = document.getElementById("font-title1");
            fontActive.classList.add("font-title-active");
            fontActive.classList.remove("font_focus");
            const borderActive = document.getElementById("active2");
            borderActive.classList.add("step_focus");
            const fontAfterActive = document.getElementById("font-title2");
            fontAfterActive.classList.add("font_focus");
            }
            else {
              $(".myAlert-top").hide();
              if (data["messages"]["email"] !== undefined) {
                this.toastrService.error("Email Already Exists");
              } else if (data["messages"]["password"] !== undefined) {
                this.toastrService.error("Password did not meet our policies");
              } else {
                this.toastrService.error(
                  "Something went wrong, Please try again later"
                );
              }
            }
          })
          }
        else{
          this.toastrService.error(
            "There is something went wrong while uploading Profile image, Please try again later"
          );
        }
        })
          // const bordernumber2 = document.getElementById("border-color1");
          // bordernumber2.classList.add("border-color");
        
        this.firstButtonValue = "Next";
     
    }
  }
  //  Function Name : Roastery Account Details .
  // Description: This function helps to add roastary account details step2 in setup
  roasteryDetails() {
    this.numb = document.getElementById('finalNumber_roaster').innerHTML + this.roaster_phone;
    console.log(this.numb)
    console.log("The final value of phone no: ", this.numb);
    if( this.roaster_name == "" && this.roaster_email == "" && this.roaster_phone == "" && this.country == "" 
      && this.address1 == "" && this.city == "" && this.founded_year == "" && this.short_descr == ""){
        $(".myAlert-top").show();
        this.roasterNameError  = "Please fill the mandatory details";
        this.roasterEmailError = "Please fill the mandatory details";
        this.roasterPhoneError = "Please fill the mandatory details";
        this.countryError = "Please fill the mandatory details";
        this.cityError = "Please fill the mandatory details";
        this.address1Error = "Please fill the mandatory details";
        this.foundedYearError = "Please fill the mandatory details";
        this.shortDescrError = "Please fill the mandatory details";
        document.getElementById("roaster_name").style.border =
          "1px solid #D50000";
          document.getElementById("roaster_email").style.border =
          "1px solid #D50000";
          document.getElementById("roaster_phoneNo").style.border =
          "1px solid #D50000";
          document.getElementById("country").style.border =
          "1px solid #D50000";
          document.getElementById("address1").style.border =
          "1px solid #D50000";
          document.getElementById("city").style.border =
          "1px solid #D50000";
          document.getElementById("founded_year").style.border =
          "1px solid #D50000";
          document.getElementById("short_descr").style.border =
          "1px solid #D50000";
        setTimeout(() => {
          this.roasterNameError = "";
          this.roasterEmailError = "";
          this.roasterPhoneError = "";
          this.countryError = "";
          this.address1Error = "";
          this.cityError = "";
          this.foundedYearError = "";
          this.shortDescrError = "";
        }, 3000);
    }
    else if (
      this.roaster_name == "" ||
      this.roaster_name == null ||
      this.roaster_name == undefined
    ) {
      $(".myAlert-top").show();
      this.roasterNameError = "Please enter name";
      document.getElementById("roaster_name").style.border =
        "1px solid #d50000";
      setTimeout(() => {
        this.roasterNameError = "";
      }, 3000);
    } else if (
      this.roaster_email == "" ||
      this.roaster_email == null ||
      this.roaster_email == undefined
    ) {
      $(".myAlert-top").show();
      this.roasterEmailError = "Please enter your EmailID";
      document.getElementById("roaster_email").style.border =
        "1px solid #d50000";
      setTimeout(() => {
        this.roasterEmailError = "";
      }, 3000);
    } else if (!this.roaster_email.match(this.mailformat)) {
      $(".myAlert-top").show();
      this.emailError = "Please enter valid EmailID";
      document.getElementById("roaster_email").style.border =
        "1px solid #d50000";
      setTimeout(() => {
        this.emailError = "";
      }, 3000);
    } else if (
      this.roaster_phone == "" ||
      this.roaster_phone == null ||
      this.roaster_phone == undefined
    ) {
      $(".myAlert-top").show();
      this.roasterPhoneError = "Please enter Phonenumber";
      document.getElementById("roaster_phoneNo").style.border =
        "1px solid #d50000";
      setTimeout(() => {
        this.roasterPhoneError = "";
      }, 3000);
    } else if (!this.roaster_phone.toString().match(this.phonenoFormat)) {
      $(".myAlert-top").show();
      this.roasterPhoneError = "Please valid Phonenumber";
      document.getElementById("roaster_phoneNo").style.border =
        "1px solid #d50000";
      setTimeout(() => {
        this.roasterPhoneError = "";
      }, 3000);
    } else if (
      this.country == "" ||
      this.country == null ||
      this.country == undefined
    ) {
      $(".myAlert-top").show();
      this.countryError = "Please select country";
      document.getElementById("country").style.border = "1px solid #d50000";
      setTimeout(() => {
        this.countryError = "";
      }, 3000);
    } 
    // else if (
    //   this.state == "" ||
    //   this.state == null ||
    //   this.state == undefined
    // ) {
    //   $(".myAlert-top").show();
    //   this.stateError = "Please select state";
    //   document.getElementById("state").style.border = "1px solid #d50000";
    //   setTimeout(() => {
    //     this.stateError = "";
    //   }, 3000);
    // }
     else if (
      this.address1 == "" ||
      this.address1 == null ||
      this.address1 == undefined
    ) {
      $(".myAlert-top").show();
      this.address1Error = "Please enter address";
      document.getElementById("address1").style.border = "1px solid #d50000";
      setTimeout(() => {
        this.address1Error = "";
      }, 3000);
    } 
    // else if (
    //   this.address2 == "" ||
    //   this.address2 == null ||
    //   this.address2 == undefined
    // ) {
    //   $(".myAlert-top").show();
    //   this.address2Error = "Please enter address";
    //   document.getElementById("address2").style.border = "1px solid #d50000";
    //   setTimeout(() => {
    //     this.address2Error = "";
    //   }, 3000);
    // }
     else if (this.city == "" || this.city == null || this.city == undefined) {
      $(".myAlert-top").show();
      this.cityError = "Please enter city";
      document.getElementById("city").style.border = "1px solid #d50000";
      setTimeout(() => {
        this.cityError = "";
      }, 3000);
    }
    // else if(this.zip_code == "" || this.zip_code == null || this.zip_code == undefined){
    //   $(".myAlert-top").show();
    //             this.zipCodeError="Please enter zip code";
    //             document.getElementById('zip_code').style.border="1px solid #FD4545";
    //             setTimeout(() => {
    //               this.zipCodeError="";
    //             },3000);
    //     }
    else if (
      this.founded_year == "" ||
      this.founded_year == null ||
      this.founded_year == undefined
    ) {
      $(".myAlert-top").show();
      this.foundedYearError = "Please select year";
      document.getElementById("founded_year").style.border =
        "1px solid #d50000";
      setTimeout(() => {
        this.foundedYearError = "";
      }, 3000);
    } else if (
      this.website == "" ||
      this.website == null ||
      this.website == undefined
    ) {
      $(".myAlert-top").show();
      this.websiteError = "Description is required";
      document.getElementById("short_descr").style.border =
        "1px solid #d50000";
      setTimeout(() => {
        this.websiteError = "";
      }, 3000);
    } else if (
      this.short_descr == "" ||
      this.short_descr == null ||
      this.short_descr == undefined
    ) {
      $(".myAlert-top").show();
      this.shortDescrError = "Description is required";
      document.getElementById("short_descr").style.border =
        "1px solid #d50000";
      setTimeout(() => {
        this.shortDescrError = "";
      }, 3000);
    }
    // else if(this.facebook_url == "" || this.facebook_url == null || this.facebook_url == undefined){
    //   $(".myAlert-top").show();
    //   this.facebookError="Facebook url is required ";
    //   document.getElementById('facebook_url').style.border="1px solid #FD4545";
    //   setTimeout(() => {
    //     this.facebookError="";
    //   },3000);
    // }
    // else if(this.instagram_url == "" || this.instagram_url == null || this.instagram_url == undefined){
    //   $(".myAlert-top").show();
    //   this.instagramError="Instagram url is required ";
    //   document.getElementById('instagram_url').style.border="1px solid #FD4545";
    //   setTimeout(() => {
    //     this.instagramError="";
    //   },3000);
    // }
    else {
      $(".myAlert-top").hide();
      this.secondButtonValue = "Loading";
      var data = {
        name: this.roaster_name,
        email: this.roaster_email,
        phone: this.numb,
        country: this.country,
        state: this.state,
        address_line1: this.address1,
        address_line2: this.address2,
        city: this.city,
        zipcode: this.zip_code,
        founded_on: parseInt(this.founded_year),
        website: this.website,
        description: this.short_descr,
        fb_profile: "facebook.com/" + this.facebook_url,
        ig_profile: "instagram.com/" + this.instagram_url,
        admin_id: parseInt(this.cookieService.get("setupUserId")),
        token : this.tokenData
        // "admin_id" : this.role
      };
      console.log("the data coming inside are :" + JSON.stringify(data));
      this.userService.roasterDetails(data).subscribe(result => {
        $(".myAlert-top").hide();
        console.log(result);
        if (result["success"] == true) {
          this.cookieService.set("roaster_id", result["result"]["roaster_id"]);
          
          var ImageURL = this.roasterService.croppedImage;
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
           "/ro/"+result['result']['roaster_id']+"/company-image"
         );
         formData.append("token", this.cookieService.get('authorization_key'));
         this.userService.uploadProfileImage(formData).subscribe(
          response => {
            console.log(response)
            if(response['success']== true){
    
                    console.log(response);
                    this.secondButtonValue = "Next";
                    $(".myAlert-top").hide();
                    this.toastrService.success(
                      "Roaster details has been added successfully"
                    );
                    const secondtab = document.getElementById("second-tab");
                    secondtab.classList.remove("current");
                    const thirdtab = document.getElementById("third-tab");
                    thirdtab.classList.add("current");
                    const activenumber3 = document.getElementById("active2");
                    activenumber3.classList.add("Member-tracker-active");
                    activenumber3.classList.remove("step_focus");
                    const fontActive = document.getElementById("font-title2");
                    fontActive.classList.add("font-title-active");
                    fontActive.classList.remove("font_focus");
                    // const bordernumber3 = document.getElementById("border-color1");
                    // bordernumber3.classList.add("border-color");
                    const borderActive = document.getElementById("active3");
                    borderActive.classList.add("step_focus");
                    const fontAfterActive = document.getElementById("font-title3");
                    fontAfterActive.classList.add("font_focus");
                  }
                  else{
                    this.toastrService.error("Error in uploading the file, Please try again")
                  }
                }
              )
        } else {
          $(".myAlert-top").hide();
          if (result["messages"]["email"] !== undefined) {
            this.toastrService.error("Email Already Exists");
          } else if (result["messages"]["website"] === "invalid") {
            this.toastrService.error(
              "Please provide valid website URL. ex:'abc.com'."
            );
          } else {
            this.toastrService.error(
              "There is something went wrong! Please try again later"
            );
          }
        }
        this.secondButtonValue = "Next";
      });
    }
  }
  //  Function Name : Next Step Proceed.
  //Description: This function helps to proceed from step3 to step4.
  licenseDetails() {
    const thirdtab = document.getElementById("third-tab");
    thirdtab.classList.remove("current");
    const fourthtab = document.getElementById("fourth-tab");
    fourthtab.classList.add("current");
    const activenumber4 = document.getElementById("active3");
    activenumber4.classList.add("Member-tracker-active");
    activenumber4.classList.remove("step_focus");
    const fontActive = document.getElementById("font-title3");
    fontActive.classList.add("font-title-active");
    fontActive.classList.remove("font_focus");
    // const bordernumber4 = document.getElementById("border-color2");
    // bordernumber4.classList.add("border-color");
    const borderActive = document.getElementById("active4");
    borderActive.classList.add("step_focus");
    const fontAfterActive = document.getElementById("font-title4");
    fontAfterActive.classList.add("font_focus");
    this.toastrService.success("Certificates Added Successfully");
    this.new_user_email = this.cookieService.get('new_user_email');
  }

  //  Function Name : Previous Tab.
  //Description: This is previous Tab functionality.
  goprevtab(myval: any) {
    if (myval == "first-tab") {
      const secondtab = document.getElementById("second-tab");
      secondtab.classList.remove("current");
      const firsttab = document.getElementById("first-tab");
      firsttab.classList.add("current");
    } else if (myval == "second-tab") {
      const thirdtab = document.getElementById("third-tab");
      thirdtab.classList.remove("current");
      const secondtab = document.getElementById("second-tab");
      secondtab.classList.add("current");
    } else if (myval == "third-tab") {
      const fourthtab = document.getElementById("fourth-tab");
      fourthtab.classList.remove("current");
      const thirdtab = document.getElementById("third-tab");
      thirdtab.classList.add("current");
    }
  }
  //  Function Name : Done Step.
  //Description: After Completion of roaster setup and redirects to dashboard.
  done() {
    this.toastrService.success("Roaster SetUp Successfully Done!");
    this.router.navigate(["/login"]);
  }
}
