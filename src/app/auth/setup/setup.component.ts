import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { ProfileImageService } from './profile-image/profile-image.service';
import { RoasterProfileService } from './roaster-profile/roaster-profile.service';
declare var $ : any;
@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  @ViewChild("image") image;
  @ViewChild("roasterImage") roasterImage;

  mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  phonenoFormat = /^\d{10}$/;
  pwdFormat=  /^([a-zA-Z0-9@#$%^&+=*.\-_]){7,14}$/;
  
   
   name : string;
   email : string;
   phoneNo : number;
   password : string;
   role : string = 'Admin';
    nameError : string;
    emailError : string;
    phoneNoError : string;
    passwordError : string;
    roleError: string;
  
    //RoasterDetails
    roaster_name : string;
   roaster_email : string;
   roaster_phone : number;
   country : string = '';
   state : string = '';
   address1 : string;
   address2 : string;
   city : string;
   zip_code : number;
   founded_year : string = '';
   website : string;
   short_descr  : string;
   facebook_url : string;
   instagram_url : string;
  
   roasterNameError :string;
   roasterEmailError : string;
   roasterPhoneError : string;
   countryError: string;
   stateError : string;
   address1Error : string;
   address2Error : string;
   cityError : string;
   zipCodeError : string;
   foundedYearError : string;
   websiteError : string;
   shortDescrError : string;
   facebookError : string;
   instagramError : string;
  
  

  constructor( public profileImageService : ProfileImageService ,public roasterService : RoasterProfileService) {
    this.nameError ='';
    this.emailError ='';
    this.phoneNoError ='';
    this.passwordError ='';
    this.roleError ='';

    this.roasterNameError = '';
    this.roasterEmailError = '';
    this.roasterPhoneError = '';
    this.countryError = '';
    this.stateError='';
    this.address1Error = '';
    this.address2Error = '';
    this.cityError = '';
    this.zipCodeError = '';
    this.foundedYearError = '';
    this.websiteError = '';
    this.shortDescrError = '';
    this.facebookError = '';
    this.instagramError = '';
   }

  ngOnInit(): void {
    
$("input#password").on("focus keyup", function () {
         
});
 
$("input#password").blur(function () {
         
});
$("input#password").on("focus keyup", function () {
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
 
$("input#password").blur(function () {
 
});
$("input#password").on("focus keyup", function () {
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
            $("#length").removeClass("invalid").addClass("valid");
            score++;
        } else {
            $("#length").removeClass("valid").addClass("invalid");
        }
 
        // at least 1 digit in password
        if (a.match(/\d/)) {
            $("#pnum").removeClass("invalid").addClass("valid");
            score++;
        } else {
            $("#pnum").removeClass("valid").addClass("invalid");
        }
 
        // at least 1 capital & lower letter in password
        if (a.match(/[A-Z]/) && a.match(/[a-z]/)) {
            $("#capital").removeClass("invalid").addClass("valid");
            score++;
        } else {
            $("#capital").removeClass("valid").addClass("invalid");
        }
 
        // at least 1 special character in password {
        if ( a.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/) ) {
                $("#spchar").removeClass("invalid").addClass("valid");
                score++;
        } else {
                $("#spchar").removeClass("valid").addClass("invalid");
        }
 
 
        if(a.length > 0) {
                //show strength text
                $("#passwordDescription").text(desc[score]);
                // show indicator
                $("#passwordStrength").removeClass().addClass("strength"+score);
        } else {
                $("#passwordDescription").text("Password not entered");
                $("#passwordStrength").removeClass().addClass("strength"+score);
        }
});
 
$("input#password").blur(function () {
 
});
$("input#password").on("focus keyup", function () {
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
            $("#length").removeClass("invalid").addClass("valid");
            score++;
        } else {
            $("#length").removeClass("valid").addClass("invalid");
        }
 
        // at least 1 digit in password
        if (a.match(/\d/)) {
            $("#pnum").removeClass("invalid").addClass("valid");
            score++;
        } else {
            $("#pnum").removeClass("valid").addClass("invalid");
        }
 
        // at least 1 capital & lower letter in password
        if (a.match(/[A-Z]/) && a.match(/[a-z]/)) {
            $("#capital").removeClass("invalid").addClass("valid");
            score++;
        } else {
            $("#capital").removeClass("valid").addClass("invalid");
        }
 
        // at least 1 special character in password {
        if ( a.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/) ) {
                $("#spchar").removeClass("invalid").addClass("valid");
                score++;
        } else {
                $("#spchar").removeClass("valid").addClass("invalid");
        }
 
 
        if(a.length > 0) {
                //show strength text
                $("#passwordDescription").text(desc[score]);
                // show indicator
                $("#passwordStrength").removeClass().addClass("strength"+score);
        } else {
                $("#passwordDescription").text("Password not entered");
                $("#passwordStrength").removeClass().addClass("strength"+score);
        }
});
 
$("input#password").blur(function () {
        $("#pwd_strength_wrap").fadeOut(400);
});
  }

  onKeyPress(event:any) 
  {
    if(event.target.value == "") {
      document.getElementById(event.target.id).style.border= "1px solid #FD4545";
    } else {
      document.getElementById(event.target.id).style.border= "1px solid #E8E8E8";  
    }
  }

 
  showModalDialog() {
    this.image.nativeElement.click();
  }

  showRoasterModal(){
    this.roasterImage.nativeElement.click(); 
  }

  handleFile(e) {  
    this.profileImageService.displayModal = true;
    this.profileImageService.imageChangedEvent = e;
  }

  handleRoasterFile(e) {  
    this.roasterService.displayModal = true;
    this.roasterService.imageChangedEvent = e;
  }
 

  closeProfileModal(){
    // this.profileImageService.croppedImage = "assets/images/profile.svg";
    this.profileImageService.displayModal = false;
  }

  closeRoasterModal(){
    // this.roasterService.croppedImage = "assets/images/roaster_logo.svg";
    this.roasterService.displayModal = false;
  }

personalDetails(){
  if(this.name == "" || this.name == null || this.name == undefined){
    this.nameError="Please enter your name";
    document.getElementById('name').style.border="1px solid #FD4545";
    setTimeout(() => {
      this.nameError="";
    },3000);
    }else if(this.email == "" || this.email == null || this.email == undefined){
      this.emailError="Please enter your EmailID";
      document.getElementById('email').style.border="1px solid #FD4545";
      setTimeout(() => {
        this.emailError="";
      },3000);
    }
    else if(!(this.email.match(this.mailformat))){
      this.emailError="Please enter valid EmailID";
      document.getElementById('email').style.border="1px solid #FD4545";
      setTimeout(() => {
        this.emailError="";
      },3000);
    }else if( this.phoneNo == null || this.phoneNo == undefined){
        this.phoneNoError="Please enter Phonenumber";
        document.getElementById('phoneNo').style.border="1px solid #FD4545";
        setTimeout(() => {
          this.phoneNoError="";
        },3000);
    }else if(!(this.phoneNo.toString().match(this.phonenoFormat))){
      this.phoneNoError="Please valid Phonenumber";
      document.getElementById('phoneNo').style.border="1px solid #FD4545";
      setTimeout(() => {
        this.phoneNoError="";
      },3000);
  }
    else if(this.password == "" || this.password == null || this.password == undefined){
          this.passwordError="Please enter password";
          document.getElementById('password').style.border="1px solid #FD4545";
          setTimeout(() => {
            this.passwordError="";
          },3000);
    } else if(!(this.password.match(this.pwdFormat))){
      this.passwordError="Password should be between 8 to 15 characters";
      document.getElementById('password').style.border="1px solid #FD4545";
      setTimeout(() => {
        this.passwordError="";
      },3000);
    }
    else if(this.role == "" || this.role == null || this.role == undefined){
            this.roleError="Please select any role";
            document.getElementById('inputState').style.border="1px solid #FD4545";
            setTimeout(() => {
              this.roleError="";
            },3000);
    }else{
  const firsttab = document.getElementById('first-tab');
        firsttab.classList.remove('current');
        const secondtab = document.getElementById('second-tab');
        secondtab.classList.add('current');
        const activenumber2 = document.getElementById('active1');
        activenumber2.classList.add('Member-tracker-active');
        activenumber2.classList.remove('step_focus');
        const fontActive = document.getElementById('font-title1');
        fontActive.classList.add('font-title-active');
        fontActive.classList.remove('font_focus');
        const borderActive = document.getElementById('active2');
        borderActive.classList.add('step_focus');
        const fontAfterActive = document.getElementById('font-title2');
        fontAfterActive.classList.add('font_focus');
        const bordernumber2 = document.getElementById('border-color1');
        bordernumber2.classList.add('border-color');
    }
 
}
roasteryDetails(){
  if(this.roaster_name == "" || this.roaster_name == null || this.roaster_name == undefined){
    this.roasterNameError="Please enter name";
    document.getElementById('roaster_name').style.border="1px solid #FD4545";
    setTimeout(() => {
      this.roasterNameError="";
    },3000);
    }else if(this.roaster_email == "" || this.roaster_email == null || this.roaster_email == undefined){
      this.roasterEmailError="Please enter your EmailID";
      document.getElementById('roaster_email').style.border="1px solid #FD4545";
      setTimeout(() => {
        this.roasterEmailError="";
      },3000);
    }
    else if(!(this.roaster_email.match(this.mailformat))){
      this.emailError="Please enter valid EmailID";
      document.getElementById('roaster_email').style.border="1px solid #FD4545";
      setTimeout(() => {
        this.emailError="";
      },3000);
    }else if( this.roaster_phone == null || this.roaster_phone == undefined){
        this.roasterPhoneError="Please enter Phonenumber";
        document.getElementById('roaster_phone').style.border="1px solid #FD4545";
        setTimeout(() => {
          this.roasterPhoneError="";
        },3000);
    }else if(!(this.roaster_phone.toString().match(this.phonenoFormat))){
      this.roasterPhoneError="Please valid Phonenumber";
      document.getElementById('roaster_phone').style.border="1px solid #FD4545";
      setTimeout(() => {
        this.roasterPhoneError="";
      },3000);
  }
    else if(this.country == "" || this.country == null || this.country == undefined){
          this.countryError="Please select country";
          document.getElementById('country').style.border="1px solid #FD4545";
          setTimeout(() => {
            this.countryError="";
          },3000);
    }
    else if(this.state == "" || this.state == null || this.state == undefined){
      this.stateError="Please select state";
      document.getElementById('state').style.border="1px solid #FD4545";
      setTimeout(() => {
        this.stateError="";
      },3000);
}
else if(this.address1 == "" || this.address1 == null || this.address1 == undefined){
  this.address1Error="Please enter address";
  document.getElementById('address1').style.border="1px solid #FD4545";
  setTimeout(() => {
    this.address1Error="";
  },3000);
}
else if(this.address2 == "" || this.address2 == null || this.address2 == undefined){
  this.address2Error="Please enter address";
  document.getElementById('address2').style.border="1px solid #FD4545";
  setTimeout(() => {
    this.address2Error="";
  },3000);
}
else if(this.city == "" || this.city == null || this.city == undefined){
  this.cityError="Please enter city";
  document.getElementById('city').style.border="1px solid #FD4545";
  setTimeout(() => {
    this.cityError="";
  },3000);
}else if(this.zip_code == null || this.zip_code == undefined){
            this.zipCodeError="Please enter zip code";
            document.getElementById('zip_code').style.border="1px solid #FD4545";
            setTimeout(() => {
              this.zipCodeError="";
            },3000);
    }
    else if(this.founded_year == '' || this.founded_year == null || this.founded_year == undefined){
      this.foundedYearError="Please select year";
      document.getElementById('founded_year').style.border="1px solid #FD4545";
      setTimeout(() => {
        this.foundedYearError="";
      },3000);
}
else if(this.short_descr == "" || this.short_descr == null || this.short_descr == undefined){
  this.shortDescrError="Description is required";
  document.getElementById('example_text').style.border="1px solid #FD4545";
  setTimeout(() => {
    this.shortDescrError="";
  },3000);
}
else if(this.facebook_url == "" || this.facebook_url == null || this.facebook_url == undefined){
  this.facebookError="Facebook url is required ";
  document.getElementById('facebook_url').style.border="1px solid #FD4545";
  setTimeout(() => {
    this.facebookError="";
  },3000);
}
else if(this.instagram_url == "" || this.instagram_url == null || this.instagram_url == undefined){
  this.instagramError="Instagram url is required ";
  document.getElementById('instagram_url').style.border="1px solid #FD4545";
  setTimeout(() => {
    this.instagramError="";
  },3000);
}
else{
  const secondtab = document.getElementById('second-tab');
  secondtab.classList.remove('current');
  const thirdtab = document.getElementById('third-tab');
  thirdtab.classList.add('current');
  const activenumber3 = document.getElementById('active2');
  activenumber3.classList.add('Member-tracker-active');
  activenumber3.classList.remove('step_focus');
  const fontActive = document.getElementById('font-title2');
        fontActive.classList.add('font-title-active');
        fontActive.classList.remove('font_focus');
  const bordernumber3 = document.getElementById('border-color2');
  bordernumber3.classList.add('border-color');
  const borderActive = document.getElementById('active3');
  borderActive.classList.add('step_focus');
  const fontAfterActive = document.getElementById('font-title3');
  fontAfterActive.classList.add('font_focus');

}
}
licenseDetails(){
  const thirdtab = document.getElementById('third-tab');
  thirdtab.classList.remove('current');
  const fourthtab = document.getElementById('fourth-tab');
  fourthtab.classList.add('current');
  const activenumber4 = document.getElementById('active3');
  activenumber4.classList.add('Member-tracker-active');
  activenumber4.classList.remove('step_focus');
  const fontActive = document.getElementById('font-title3');
        fontActive.classList.add('font-title-active');
        fontActive.classList.remove('font_focus');
  const bordernumber4 = document.getElementById('border-color3');
  bordernumber4.classList.add('border-color');
  const borderActive = document.getElementById('active4');
  borderActive.classList.add('step_focus');
  const fontAfterActive = document.getElementById('font-title4');
  fontAfterActive.classList.add('font_focus');

}
goprevtab( myval:any ){
  if(myval == 'first-tab'){
    const secondtab = document.getElementById('second-tab');
    secondtab.classList.remove('current');
    const firsttab = document.getElementById('first-tab');
    firsttab.classList.add('current');
   
  }

  else if(myval == 'second-tab'){
    const thirdtab = document.getElementById('third-tab');
    thirdtab.classList.remove('current');
    const secondtab = document.getElementById('second-tab');
    secondtab.classList.add('current');
  }

  else if(myval == 'third-tab'){
    const fourthtab = document.getElementById('fourth-tab');
    fourthtab.classList.remove('current');
    const thirdtab = document.getElementById('third-tab');
    thirdtab.classList.add('current');
  }


}

}
