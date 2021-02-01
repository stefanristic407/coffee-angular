import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { map } from 'rxjs/operators';
import { RoasteryProfileService } from 'src/app/features/roastery-profile/roastery-profile.service';
@Component({
  selector: 'app-visit-us',
  templateUrl: './visit-us.component.html',
  styleUrls: ['./visit-us.component.css']
})
export class VisitUsComponent implements OnInit {
  appLanguage?: any;
  brandProfileActive:any=0;
  banner_file: any;
  banner_title: string = '';
  country: string = '';
  state: string = '';
  address1: string = '';
  address2: string = '';
  city: string = '';
  zip_code: string = '';
  email: string = '';
  phoneNumber: string = '' ;
  roaster_id: any;
  banner_id: any;
  banner_image_name: string = '';
  savedFaqArray: any[]=[];
  questionArray = [];
  public addanotherrow: number;
  questionTypeError: string;
  questionAnswerError: string;
  questionError: string;

  constructor(public globals: GlobalsService,
    private toastrService: ToastrService,
    public cookieService: CookieService,
    public userService : UserserviceService,
    public route : Router,
    public roasterService: RoasterserviceService,
    public roasterProfileService : RoasteryProfileService) {
    this.roaster_id = this.cookieService.get("roaster_id");
    this.questionArray.push({
      id: 1,
      question:'',
      answer:'',
      type:''
    });
    this.questionTypeError = "";
    this.questionError = "";
    this.questionAnswerError = "";
    // this.addanotherrow = this.questionArray.length;
  }
  ngOnInit(): void {
    this.language();
    this.getVisitDetails();
    this.getFAQList();
  }

  language(){
    this.appLanguage = this.globals.languageJson;
    this.brandProfileActive++;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.savedFaqArray, event.previousIndex, event.currentIndex);
  }

  //Description: This function helps for saving question.
  saveQuestion(rowcount, event) {
    for (let j = 0; j < this.questionArray.length; j++) {
      if (
        this.questionArray[j].question == "" &&  this.questionArray[j].answer == ""){
          $(".myAlert-top").show();
          this.questionTypeError = "Please Fill the mandatory Fields";
          this.questionAnswerError = "Please Fill the mandatory Fields";
          this.questionError = "Please Fill the mandatory Fields";
          document.getElementById("question_answer").style.border =
            "1px solid #d50000";
            document.getElementById("question").style.border =
            "1px solid #d50000";
            // document.getElementById("certification_year").style.border =
            // "1px solid #d50000";
            document.getElementById("question_type").style.border =
            "1px solid #d50000";
          setTimeout(() => {
            this.questionTypeError = "";
            this.questionAnswerError = "";
            this.questionError = "";
          }, 3000);
        }
      // else if (
      //   this.questionArray[j].type == "" ||
      //   this.questionArray[j].type == null ||
      //   this.questionArray[j].type == undefined
      // ) {
      //   $(".myAlert-top").show();
      //   this.questionTypeError = "Please enter type";
      //   document.getElementById("question_type").style.border =
      //     "1px solid #d50000";
      //   setTimeout(() => {
      //     this.questionTypeError = "";
      //   }, 3000);
      // } 
      else if (
        this.questionArray[j].answer == "" ||
        this.questionArray[j].answer == null ||
        this.questionArray[j].answer == undefined
      ) {
        $(".myAlert-top").show();
        this.questionAnswerError = "Please enter Answer";
        document.getElementById("question_answer").style.border =
          "1px solid #d50000";
        setTimeout(() => {
          this.questionAnswerError = "";
        }, 3000);
      }
      else if (
        this.questionArray[j].question == '' ||
        this.questionArray[j].question == null ||
        this.questionArray[j].question == undefined
      ) {
        $(".myAlert-top").show();
        this.questionError = "Please enter question";
        document.getElementById("question").style.border =
          "1px solid #d50000";
        setTimeout(() => {
          this.questionError = "";
        }, 3000);
      }
     
      else {
        const payload = {
          question: this.questionArray[j].question,
          faq_type: 'DISPUTE',
          answer: this.questionArray[j].answer,
          status:'ENABLED'
        }
        this.userService.addFAQ(this.roaster_id, payload).subscribe((data)=> {
          // console.log(data)
          this.savedFaqArray.push({
            id: this.questionArray[j].id,
            question: this.questionArray[j].question,
            type: this.questionArray[j].type,
            answer: this.questionArray[j].answer,
           });
           this.questionArray = [];
           this.getFAQList();
          this.toastrService.success("FAQ added successfully");
        },(err) => {
          this.toastrService.error("Error while adding");
        })

      }
    }
    if (this.questionArray.length == 0) {
      this.questionArray.push({
        id: 1,
        question:'',
        answer:'',
        type: ""
      });
    }
  }

  onFileChange(event: any, width: any, height: any, FieldValue: any) {
    var files = event.target.files;
    // this.fileEvent = this.files;
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
      if (files[0].type == "image/png" || files[0].type == "image/jpg" || files[0].type == "image/jpeg" || files[0].type == "image/gif") {
        let reader = new FileReader();
        let img = new Image();
        let fileValue = event.target.files[0];
        img.src = window.URL.createObjectURL(fileValue);
        reader.readAsDataURL(fileValue);
        reader.onload = () => {
          setTimeout(() => {
            const widthValue = img.naturalWidth;
            const heightValue = img.naturalHeight;

            window.URL.revokeObjectURL(img.src);
            console.log(widthValue + '*' + widthValue);
            if (widthValue === width && widthValue === height) {
              alert(`photo should be ${width} x ${height} size`);
            } else {
              var imgURL = reader.result;
              if (imgURL) {
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
                  "/ro/" + this.roaster_id + "/file-manager/files"
                );
                formData.append("token", this.cookieService.get("Auth"));
                this.roasterService.uploadFiles(formData).subscribe(
                  data => {
                    if (data['success'] == true) {
                      this.toastrService.success("File uploaded successfully");
                      if (FieldValue == "Banner") {
                        this.banner_id = data['result'].id;
                        this.banner_image_name = files[0].name;
                      }
                    }
                    else {
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
      else if (files[0].type == "video/mp4" || files[0].type == "video/mpeg" ||
        files[0].type == "video/mov" || files[0].type == "video/wmv" ||
        files[0].type == "video/flv" || files[0].type == "video/webm") {
        console.log("Video");
        let formData: FormData = new FormData();
        formData.append("file", files[0], files[0].name);
        formData.append("name", files[0].name);
        formData.append("file_module", "Brand-Profile");
        formData.append(
          "api_call",
          "/ro/" + this.roaster_id + "/file-manager/files"
        );
        formData.append("token", this.cookieService.get("Auth"));
        this.roasterService.uploadFiles(formData).subscribe(
          data => {
            if (data['success'] == true) {
              this.toastrService.success("File uploaded successfully");
              if (FieldValue == "Banner") {
                this.banner_id = data['result'].id;
                this.banner_image_name = files[0].name;
              }
            }
            else {
              this.toastrService.error("Error while uploading the File");
            }
          }
        )
      }
      else {
        this.toastrService.error("If image, please select JPG,PNG or JPEG ");
        this.toastrService.error("If Video, Please select MP4,MOV,WMV");
      }
    }
  }

  saveVisitProfile(){
    if(this.banner_title == "" || this.country == "" || this.state == "" ||
          this.address1 == "" || this.city == "" || this.email == "" || this.phoneNumber == ''){
            this.toastrService.error("Please fill all the fields");
          }
          else{
            var data = {
              banner_file : this.banner_id,
              banner_title : this.banner_title,
              country : this.country,
              state : this.state,
              // title: this.title,
              address1: this.address1,
              address2:this.address2,
              city: this.city,
              zip_code: this.zip_code,
              email: this.email,
              phone: this.phoneNumber
            }
            this.userService.updateHomeDetails(this.roaster_id, data,'visit-us').subscribe(
              res => {
                if(res['success'] == true){
                  this.toastrService.success("Visit page Details updated successfully");
                  this.route.navigate(['/features/brand-profile']);
                }
                else{
                  this.toastrService.error("Error while updating details");
                }
              }
            )
          }
  }

  changeCountry() {
    // console.log("the selected country is : " + this.country);
    this.roasterProfileService.changeCountry(this.country);
  }

  async getVisitDetails() {
    this.userService.getPageDetails(this.roaster_id,'visit-us').subscribe(async (data) =>{
      if(data['result'] != {}) {        
        this.banner_id = data['result'].banner_file,
        this.banner_title = data['result'].banner_title,
        this.country = data['result'].country,
        this.state = data['result'].state,
        // title: this.title,
        this.address1 = data['result'].address1,
        this.address2 = data['result'].address2,
        this.city = data['result'].city,
        this.zip_code = data['result'].zip_code,
        this.email = data['result'].email,
        this.phoneNumber = data['result'].phone,
        this.banner_image_name = await this.userService.getFileDetails(this.roaster_id,this.banner_id).pipe(map(response => response['name'])).toPromise();
        this.roasterProfileService.changeCountry(this.country);
      }
    })
  }

  addnewrow() { 
    if(this.questionArray.length == 1) {
      return;
    }
    var newrowc = this.addanotherrow + 1;
    this.addanotherrow = newrowc;
    this.questionArray.push({
      question:'',
      answer:'',
      type:'',
      id: 1
    });
    //this.licenseArray.push(this.licenseArray.length);
  }

  getFAQList() {
    this.userService.getFAQList(this.roaster_id).subscribe((data) =>{
    this.savedFaqArray = data['result'];
    });
  }

  deleteFAQ(faq) {
    if (confirm("Please confirm! you want to delete?") == true){
      this.userService.deleteFAQ(this.roaster_id,faq.id).subscribe(
        response => {
          if(response['success']==true){
            this.toastrService.success("The selected FAQ has been deleted successfully");
            this.getFAQList();
          }
          else{
            this.toastrService.error("Something went wrong while deleting the FAQ");
          }
        }
      )
    }
  }

  editFAQ(faq) {

  }

}
