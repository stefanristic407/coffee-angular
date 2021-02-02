import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { Router } from '@angular/router';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sustainability',
  templateUrl: './sustainability.component.html',
  styleUrls: ['./sustainability.component.css']
})
export class SustainabilityComponent implements OnInit {
  appLanguage?: any;
  brandProfileActive:any=0;
  banner_title : string = "";
  intro_title : string = "";
  section_title : string = "";
  section_title1 : string = "";
  section_title2: string = "";
  section_title3 : string = "";
  section_title4 : string = "";
  description : string = "";
  answer : string = "";
  section_answer : string = "";
  section_answer1 : string = "";
  section_answer2 : string = "";
  section_answer3 : string = "";
  section_answer4 : string = "";
  roaster_id: string;
  banner_id: any;
  intro_id: any;
  section_file_id: any;
  section_file1_id: any;
  section_file2_id: any;
  section3_file_id_1: any;
  section3_file_id_2: any;
  section4_file_id_1: any;
  section4_file_id_2: any;
  banner_image: string = '';
  intro_image: string = '';
  section_file_image: string = '';
  section_file1_image: string = '';
  section_file2_image: string = '';
  section_file3_image_1: string = '';
  section_file3_image_2: string = '';
  section_file4_image_2: string = '';
  section_file4_image_1: string = '';
  constructor(public globals : GlobalsService,
    private toastrService : ToastrService,
    public cookieService : CookieService,
    public userService : UserserviceService,
    public route : Router,
    public roasterService : RoasterserviceService) { 
      this.roaster_id = this.cookieService.get("roaster_id"); }

  ngOnInit(): void {
    this.language();
    this.getSubstainabilityDetails();
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
    // console.log(files)
    if ((FieldValue == 'Section3' || FieldValue == 'Section4') && files.length != 2) {
      if (files.length > 2) {
        this.toastrService.error("You can only upload a maximum of 2 files");
        return;
      } else {
        this.toastrService.error("Please upload 2 files");
        return;
      }
    }
    if (files.length > 0) { 
      console.log(files,"files")
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
        for(let i=0;i<files.length;i++){
        if(files[i].type == "image/png" || files[i].type == "image/jpg" || files[i].type == "image/jpeg" || files[i].type == "image/gif"){
        let reader = new FileReader();
        let img = new Image();
        let fileValue = event.target.files[i];
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
              // console.log(imgURL)
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
            formData.append("file", fileValue, fileValue.name);
            formData.append("name", fileValue.name);
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
                  switch (FieldValue) {
                    case "Banner":
                      {
                        this.banner_id = data['result'].id;
                        this.banner_image = fileValue.name;
                        break;
                      }
                      case "Intro": 
                      {
                        this.intro_id = data['result'].id;
                        this.intro_image = fileValue.name;

                        break;
                      }
                      case "Section": 
                    {
                      this.section_file_id = data['result'].id;
                      this.section_file_image = fileValue.name;
                      break;
                    }
                    case "Section1": 
                    {
                      this.section_file1_id = data['result'].id;
                      this.section_file1_image = fileValue.name;
                      break;
                    }
                    case "Section2": 
                    {
                      this.section_file2_id = data['result'].id;
                      this.section_file2_image = fileValue.name;
                      break;
                    }
                    case "Section3": 
                    {
                      this['section3_file_id_' + [i + 1]] = data['result'].id;
                      this['section_file3_image_' + [i + 1]] = fileValue.name;
                      break;
                    }
                    case "Section4": 
                    {
                      this['section4_file_id_' + [i + 1]] = data['result'].id;
                      this['section_file4_image_' + [i + 1]] = fileValue.name;
                      break;
                    }
                      
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

else if(files[i].type == "video/mp4" || files[i].type == "video/mpeg" || 
        files[i].type == "video/mov" || files[i].type == "video/wmv" || 
        files[i].type == "video/flv" || files[i].type == "video/webm"){
console.log("Video");
let fileValue = event.target.files[i];

let formData: FormData = new FormData();
formData.append("file", fileValue, fileValue.name);
formData.append("name", fileValue.name);
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
      switch (FieldValue) {
        case "Banner":
          {
            this.banner_id = data['result'].id;
            this.banner_image = fileValue.name;
            break;
          }
          case "Intro": 
          {
            this.intro_id = data['result'].id;
            this.intro_image = fileValue.name;
            break;
          }
          case "Section": 
          {
            this.section_file_id = data['result'].id;
            this.section_file_image = fileValue.name;
            break;
          }
          case "Section1": 
          {
            this.section_file1_id = data['result'].id;
            this.section_file1_image = fileValue.name;
            break;
          }
          case "Section2": 
          {
            this.section_file2_id = data['result'].id;
            this.section_file2_image = fileValue.name;
            break;
          }
          case "Section3": 
          {                      
            this['section3_file_id_' + [i + 1]] = data['result'].id;
            this['section_file3_image_' + [i + 1]] = fileValue.name;
            break;
          }
          case "Section4": 
          {
            this['section4_file_id_' + [i + 1]] = data['result'].id;
            this['section_file4_image_' + [i + 1]] = fileValue.name;
            break;
          }
          
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
} //for loop
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
    if(this.banner_title == "" || this.intro_title == "" || this.answer == "" || this.section_title == "" ||
    this.section_title1 == "" || this.section_title2 == "" || this.section_title3 == "" || this.section_title4 == "" || 
    this.section_answer == "" || this.section_answer1 == "" ||  this.section_answer2 == "" || this.section_answer3 == "" || this.section_answer4 == "" ){
            this.toastrService.error("Please fill all the fields");
          }
          else{
            var data = {
              banner_file : this.banner_id,
              banner_title : this.banner_title,
              intro_title : this.intro_title,
              intro_short_description : this.answer,
              intro_file : this.intro_id,
              title: this.section_title,
              short_description : this.section_answer,
              file : this.section_file_id,
              section1_title : this.section_title1,
              section1_description: this.section_answer1,
              section1_file : this.section_file1_id,
              section2_title : this.section_title2,
              section2_description: this.section_answer2,
              section2_file : this.section_file2_id,
              section3_title : this.section_title3,
              section3_description: this.section_answer3,
              section3_file_1 : this.section3_file_id_1,
              section3_file_2: this.section3_file_id_2,
              section4_title : this.section_title4,
              section4_description: this.section_answer4,
              section4_file_1 : this.section4_file_id_1,
              section4_file_2: this.section4_file_id_2,
              product_short_description : this.description
            }
            this.userService.updateLearnDetails(this.roaster_id, data,'sustainability').subscribe(
              res => {
                if(res['success'] == true){
                  this.toastrService.success("sustainability Details updated successfully");
                  this.route.navigate(['/features/brand-profile']);
                }
                else{
                  this.toastrService.error("Error while updating details");
                }
              }
            )
          }
  }

  async getSubstainabilityDetails() {
    this.userService.getPageDetails(this.roaster_id, 'sustainability').subscribe(async (data) => {
      if (data['result'] != {}) {
        this.banner_id = data['result'].banner_file,
        this.banner_title = data['result'].banner_title;
        this.intro_title = data['result'].intro_title;
        this.description = data['result'].product_short_description
        this.intro_title  = data['result'].intro_title,
        this.answer  = data['result'].intro_short_description,
        this.intro_id = data['result'].intro_file,
        this.section_title = data['result'].title,
        this.section_answer = data['result'].short_description
        this.section_file_id = data['result'].file,
        this.section_title1 = data['result'].section1_title,
        this.section_answer1 = data['result'].section1_description,
        this.section_file1_id = data['result'].section1_file,
        this.section_title2 = data['result'].section2_title,
        this.section_answer2 = data['result'].section2_description,
        this.section_file2_id = data['result'].section2_file,
        this.section_title3 = data['result'].section3_title,
        this.section_answer3 = data['result'].section3_description,
        this.section3_file_id_1 = data['result'].section3_file_1,
        this.section3_file_id_2 = data['result'].section3_file_2,
        this.section_title4 = data['result'].section4_title,
        this.section_answer4 = data['result'].section4_description,
        this.section4_file_id_1 = data['result'].section4_file_1,
        this.section4_file_id_2 = data['result'].section4_file_2

        this.section_file_image = await this.userService.getFileDetails(this.roaster_id, this.section_file_id).pipe(map(response => response['name'])).toPromise();
        this.banner_image = await this.userService.getFileDetails(this.roaster_id, this.banner_id).pipe(map(response => response['name'])).toPromise();
        this.intro_image = await this.userService.getFileDetails(this.roaster_id, this.intro_id).pipe(map(response => response['name'])).toPromise();
      //  this. 
       this.section_file1_image = await this.userService.getFileDetails(this.roaster_id, this.section_file_id).pipe(map(response => response['name'])).toPromise();
       this.section_file2_image = await this.userService.getFileDetails(this.roaster_id, this.section_file2_id).pipe(map(response => response['name'])).toPromise();
      
       this.section_file3_image_2 = await this.userService.getFileDetails(this.roaster_id, this.section3_file_id_2).pipe(map(response => response['name'])).toPromise();
       this.section_file3_image_1 = await this.userService.getFileDetails(this.roaster_id, this.section3_file_id_1).pipe(map(response => response['name'])).toPromise();
       
       this.section_file4_image_1 = await this.userService.getFileDetails(this.roaster_id, this.section4_file_id_1).pipe(map(response => response['name'])).toPromise();
       this.section_file4_image_2 = await this.userService.getFileDetails(this.roaster_id, this.section4_file_id_2).pipe(map(response => response['name'])).toPromise();
        
       // this.traceability_image_name_2 = await this.userService.getFileDetails(this.roaster_id, this.traceability_id_2).pipe(map(response => response['name'])).toPromise();

        // this.substainability_image_name_1 = await this.userService.getFileDetails(this.roaster_id, this.substainability_id_1).pipe(map(response => response['name'])).toPromise();
        // this.substainability_image_name_2 = await this.userService.getFileDetails(this.roaster_id, this.substainability_id_2).pipe(map(response => response['name'])).toPromise();
      }
    })
  }


}
