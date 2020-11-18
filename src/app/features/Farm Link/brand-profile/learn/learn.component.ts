import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { Router } from '@angular/router';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {
  appLanguage?: any;
	brandProfileActive:any=0;
  countValue: any = 0;
  banner_title : string = "";
  intro_title : string = "";
  title : string = "";
  answer : string = "";
  answer1 : string = "";
  answer2 : string = "";
  answer3 : string = "";
  answer4 : string = "";
  imageUrl: any;
  roaster_id: string;
  banner_id: any;
  intro_id: any;
  step1_id: any;
  step2_id: any;
  step3_id: any;
  step4_id: any;
  banner_image_name: any;
  intro_image_name: any;
  step1_image_name: any;
  step2_image_name: any;
  step3_image_name: any;
  step4_image_name: any;

  constructor(public globals : GlobalsService,
              private toastrService : ToastrService,
              public cookieService : CookieService,
              public userService : UserserviceService,
              public route : Router,
              public roasterService : RoasterserviceService) { 
                this.roaster_id = this.cookieService.get("roaster_id");

               }

  ngOnInit(): void {
    this.language();
  }

  language(){
    this.appLanguage = this.globals.languageJson;
    this.brandProfileActive++;
  }

  countTheString(value : any, count : any){
    let stringData = value;
    stringData = stringData.replace(/(^\s*)|(\s*$)/gi,"");
    stringData = stringData.replace(/[ ]{2,}/gi," ");
    stringData = stringData.replace(/\n /,"\n");
    if(stringData == ""){
      return 0;
    }else{
      const outputLength = stringData.split(' ').length;
      if(outputLength > count){
        value = stringData.split(' ').splice(outputLength - 1,1).join(" ");
        return outputLength - 1;
      }
      return outputLength;
      
    }
    
  }

  getTheMaxLength(value : any , countValue : any){
    const getLength = this.countTheString(value,countValue);
    return getLength == countValue ? value.length : "";
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


  onFileChange(event : any, width : any, height : any, FieldValue : any) {
    var files = event.target.files;
    // this.fileEvent = this.files;
    console.log(FieldValue)
    
    if (files.length > 0) { 
      
            // const max_height = 15200;
            // const max_width = 25600;
			// for (let x = 0; x <= files.length - 1; x++) { 

			// 	const fsize = files.item(x).size; 
			// 	const file = Math.round((fsize / 1024)); 
			// 	// The size of the file. 
      // if (file >= 2048) {
      //   this.toastrService.error("File too big, please select a file smaller than 2mb");
      //   return false;
      // }else{
        if(files[0].type == "image/png" || files[0].type == "image/jpg" || files[0].type == "image/jpeg" || files[0].type == "image/gif"){
        let reader = new FileReader();
        let img = new Image();
        let fileValue = event.target.files[0];
        img.src = window.URL.createObjectURL( fileValue );
        reader.readAsDataURL(fileValue);
        reader.onload = () => {
          setTimeout(() => {
            const widthValue = img.naturalWidth;
            const heightValue = img.naturalHeight;
      
            window.URL.revokeObjectURL( img.src );
            console.log(widthValue + '*' + widthValue);
            if ( widthValue === width && widthValue === height ) {
              alert(`photo should be ${width} x ${height} size`);
            } else {
              var imgURL = reader.result;
              console.log(imgURL)
          if(imgURL){
            // console.log(imgURL);
            // Split the base64 string in data and contentType
          //  var block = imgURL.split(";");
           // Get the content type of the image
          //  var contentType = block[0].split(":")[1];// In this case "image/gif"
           // get the real base64 content of the file
          //  var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."
           
           // Convert it to a blob to upload
          //  var blob = this.b64toBlob(realData, contentType,0);
           
            let formData: FormData = new FormData();
            console.log(files[0])
            formData.append("file", files[0], files[0].name);
            formData.append("name", files[0].name);
            formData.append("file_module", "Brand-Profile");
            formData.append(
              "api_call",
              "/ro/" + this.roaster_id +"/file-manager/files"
            );
            formData.append("token", this.cookieService.get("Auth"));
            this.roasterService.uploadFiles(formData).subscribe(
              data => {
                if(data['success'] == true){
                  this.toastrService.success("File uploaded successfully");
                  if(FieldValue == "Banner"){
                    this.banner_id = data['result'].id;
                    this.banner_image_name = files[0].name;
                  }
                  else if(FieldValue == "Intro"){
                    this.intro_id = data['result'].id;
                    this.intro_image_name = files[0].name;
                  }
                  else if(FieldValue == "Step1"){
                    this.step1_id = data['result'].id;
                    this.step1_image_name = files[0].name;
                  }
                  else if(FieldValue == "Step2"){
                    this.step2_id = data['result'].id;
                    this.step2_image_name = files[0].name;
                  }
                  else if(FieldValue == "Step3"){
                    this.step3_id = data['result'].id;
                    this.step3_image_name = files[0].name;
                  }
                  else if(FieldValue == "Step4"){
                    this.step4_id = data['result'].id;
                    this.step4_image_name = files[0].name;
                  }
                }
                else{
                  this.toastrService.error("Error while uploading the File");
                }
              }
            )
          }
            }
          }, 2000);
          // console.log(imgURL);
  }
}
else if(files[0].type == "video/mp4" || files[0].type == "video/mpeg" || 
        files[0].type == "video/mov" || files[0].type == "video/wmv" || 
        files[0].type == "video/flv" || files[0].type == "video/webm"){
console.log("Video");
let formData: FormData = new FormData();
formData.append("file", files[0], files[0].name);
formData.append("name", files[0].name);
formData.append("file_module", "Brand-Profile");
formData.append(
  "api_call",
  "/ro/" + this.roaster_id +"/file-manager/files"
);
formData.append("token", this.cookieService.get("Auth"));
this.roasterService.uploadFiles(formData).subscribe(
  data => {
    if(data['success'] == true){
      this.toastrService.success("File uploaded successfully");
      if(FieldValue == "Banner"){
        this.banner_id = data['result'].id;
        this.banner_image_name = files[0].name;
      }
      else if(FieldValue == "Intro"){
        this.intro_id = data['result'].id;
        this.intro_image_name = files[0].name;
      }
      else if(FieldValue == "Step1"){
        this.step1_id = data['result'].id;
        this.step1_image_name = files[0].name;
      }
      else if(FieldValue == "Step2"){
        this.step2_id = data['result'].id;
        this.step2_image_name = files[0].name;
      }
      else if(FieldValue == "Step3"){
        this.step3_id = data['result'].id;
        this.step3_image_name = files[0].name;
      }
      else if(FieldValue == "Step4"){
        this.step4_id = data['result'].id;
        this.step4_image_name = files[0].name;
      }
    }
    else{
      this.toastrService.error("Error while uploading the File");
    }
  }
)
}
else{
  this.toastrService.error("If image, please select JPG,PNG or JPEG ");
  this.toastrService.error("If Video, Please select MP4,MOV,WMV");
}
}
      }
// const reader = new FileReader();
//             reader.onload = (e: any) => {
//                 const image = new Image();
//                 image.src = e.target.result;
//                 image.onload = rs => {
//                     const img_height = rs.currentTarget['height'];
//                     const img_width = rs.currentTarget['width'];

//                     console.log(img_height, img_width);
//     }
//   }
    // }
  
  // }

  saveBrandProfile(){
    if(this.banner_title == "" || this.intro_title == "" || this.title == "" ||
          this.answer1 == "" || this.answer2 == "" || this.answer3 == "" || this.answer4 == ""){
            this.toastrService.error("Please fill all the fields");
          }
          else{
            var data = {
              banner_file : this.banner_id,
              banner_title : this.banner_title,
              intro_title : this.intro_title,
              intro_file : this.intro_id,
              title: this.title,
              step1_short_description : this.answer1,
              step1_file: this.step1_id,
              step2_short_description : this.answer2,
              step2_file: this.step2_id,
              step3_short_description: this.answer3,
              step3_file : this.step3_id,
              step4_short_description: this.answer4,
              step4_file: this.step4_id,
            }
            this.userService.updateLearnDetails(this.roaster_id, data,'learn').subscribe(
              res => {
                if(res['success'] == true){
                  this.toastrService.success("Learn page Details updated successfully");
                  this.route.navigate(['/features/brand-profile']);
                }
                else{
                  this.toastrService.error("Error while updating details");
                }
              }
            )
          }
  }


}
