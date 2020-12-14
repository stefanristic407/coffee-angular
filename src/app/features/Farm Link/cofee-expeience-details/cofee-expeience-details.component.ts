import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cofee-expeience-details',
  templateUrl: './cofee-expeience-details.component.html',
  styleUrls: ['./cofee-expeience-details.component.css']
})
export class CofeeExpeienceDetailsComponent implements OnInit {
  date1: Date;
  appLanguage?: any;
	coffeeDetailsActive:any = 0;
  roaster_id: string;
  website: any;
  description: any;
  image_id: any;
  image_url: any;
  video_id: any;
  video_url: any;
  tagsArray: any = [];
  certificatesArray: any = [];
  files: any;
  fileEvent: any;
  fileName: any;
  imageFileData: any;
  videoFileData: any;

  onEdit:boolean = true;
  onSave:boolean = false;
  order_type: string;
  order_id: any;
  imageFileName: any;
  videoFileName: any;
  onResponse : boolean = false;
  onRequest : boolean = true;
  videoOnRequest: boolean = true;
  videoOnResponse: boolean = false;
  constructor(public globals: GlobalsService,
              private userService : UserserviceService,
              private toastrService : ToastrService,
              private cookieService : CookieService,
              private roasterService : RoasterserviceService,
              private route : ActivatedRoute,
              private router : Router
              ) {
                this.roaster_id = this.cookieService.get('roaster_id');
                if (this.route.snapshot.queryParams['type'] != undefined && this.route.snapshot.queryParams['id'] != undefined) {
                  this.order_type = decodeURIComponent(this.route.snapshot.queryParams['type']);
                  this.order_id = parseInt(decodeURIComponent(this.route.snapshot.queryParams['id']));
                  console.log("Data : ", this.order_type);
                }
                else {
                 this.router.navigate(['/features/coffee-experience']);
                 this.toastrService.error('Order Type is not available.')
                }
              }

  ngOnInit(): void {
    this.language();
    if(this.order_type == "mr"){
      this.getMrOrdersCoffeeExperience();
    }
    else if(this.order_type == 'hrc'){
      this.getHrcOrdersCoffeeExperience();
    }
    this.getGeneralRoasterCertificates();
    $("body").on("change", ".custom-label__inputs", function () {
      var $this = $(this);
  
      if ($this.is(':checked')) {
          $this.parents('.custom-label').addClass('active');
          var totalChecked = $('.roastery-tags__checkboxes').find('.custom-label.active').length;
          console.log(totalChecked)
  
          if (totalChecked == 5) {
              $('.roastery-tags__checkboxes').find('.custom-label').find('.custom-label__inputs').prop('disabled', true);
              $('.roastery-tags__checkboxes').find('.custom-label.active').find('.custom-label__inputs').prop('disabled', false);
          }
      }
  
      else {
          $this.parents('.custom-label').removeClass('active');
          $('.roastery-tags__checkboxes').find('.custom-label').find('.custom-label__inputs').prop('disabled', false);
          $('.roastery-tags__checkboxes').find('.custom-label.active').find('.custom-label__inputs').prop('disabled', false);
      }
  });

  }

  language(){
    this.appLanguage = this.globals.languageJson;
    this.coffeeDetailsActive++;
  }

  getMrOrdersCoffeeExperience(){
    this.userService.getMrOrdersCoffeeExperience(this.roaster_id,this.order_id).subscribe(
      response => {
        if(response['success'] == true){
          this.website = response['result'].website;
          this.description = response['result'].description;
          this.image_id =  response['result'].image_id;
          this.image_url = response['result'].image_url;
          this.video_id = response['result'].video_id;
          this.video_url = response['result'].video_url;
          this.tagsArray = response['result'].tags; 
        }
        else{
          this.toastrService.error("Error while getting the Micro order details of the Roaster");
        }
      }
    )
  }

  
  getHrcOrdersCoffeeExperience(){
    this.userService.getHrcOrdersCoffeeExperience(this.roaster_id,this.order_id).subscribe(
      response => {
        if(response['success'] == true){
          this.website = response['result'].website;
          this.description = response['result'].description;
          this.image_id =  response['result'].image_id;
          this.image_url = response['result'].image_url;
          this.video_id = response['result'].video_id;
          this.video_url = response['result'].video_url;
          this.tagsArray = response['result'].tags; 
        }
        else{
          this.toastrService.error("Error while getting the Horeca order details of the Roaster");
        }
      }
    )
  }

  getGeneralRoasterCertificates(){
    this.userService.getGeneralRoasterCertificates(this.roaster_id).subscribe(
      response => {
        if(response['success'] == true){
          this.certificatesArray = response['result'];
          console.log(this.certificatesArray)
        }
        else{
          this.toastrService.error("Error while getting certificates");
        }
      }
    )
  }


  uploadImage(event:any){
    this.files = event.target.files;
    this.fileEvent = this.files;
    console.log(this.fileEvent);
    this.imageFileName = this.files[0].name;
    let fileList: FileList = this.fileEvent;
    // var parent_id = 0;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append("file", file, file.name);
      formData.append('name',this.imageFileName);
      formData.append('file_module','Coffee-Story');
      formData.append('parent_id','0');
      // this.roasterId = this.cookieService.get("roaster_id");
      formData.append(
        "api_call",
        "/ro/" + this.roaster_id + "/file-manager/files"
      );
      formData.append("token", this.cookieService.get("Auth"));
      this.roasterService.uploadFiles(formData).subscribe(
        result =>{
          if(result['success']==true){
            this.toastrService.success("The file "+this.imageFileName+" uploaded successfully");
            this.imageFileData = result['result'];
            this.image_id = result['result'].id; 
            this.image_url = result['result'].url;
            this.onResponse = true;
            this.onRequest = false;
          }else{
            this.toastrService.error("Error while uploading the file");
          }
        }
      )
    }
  }

  uploadVideo(event : any){
    this.files = event.target.files;
    this.fileEvent = this.files;
    console.log(this.fileEvent);
    this.videoFileName = this.files[0].name;
    let fileList: FileList = this.fileEvent;
    // var parent_id = 0;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append("file", file, file.name);
      formData.append('name',this.videoFileName);
      formData.append('file_module','Coffee-Story');
      formData.append('parent_id','0');
      // this.roasterId = this.cookieService.get("roaster_id");
      formData.append(
        "api_call",
        "/ro/" + this.roaster_id + "/file-manager/files"
      );
      formData.append("token", this.cookieService.get("Auth"));
      this.roasterService.uploadFiles(formData).subscribe(
        result =>{
          if(result['success']==true){
            this.toastrService.success("The file "+this.videoFileName+" uploaded successfully");
            this.videoFileData = result['result'];
            this.video_id = result['result'].id;
            this.video_url = result['result'].url;
            this.videoOnResponse = true;
            this.videoOnRequest = false;
          }else{
            this.toastrService.error("Error while uploading the file");
          }
        }
      )
    }
  }

  saveDefaultSetting(){
    if(this.website == '' || this.description == '' || this.image_id == undefined || this.video_id == undefined || this.tagsArray == []){
      this.toastrService.error("Please update all the details required");
    }
    else{
      var data = {
        "description": this.description,
        "website": this.website,
        "tags": this.tagsArray,
        "image_id": this.image_id,
        "video_id": this.video_id
      }
      if(this.order_type == "mr"){
      this.userService.postMrOrdersCoffeeExperience(this.roaster_id,this.order_id,data).subscribe(
        response => {
          if(response['success'] == true){
            this.toastrService.success("The Horeca order details updated Successfully")
            this.getMrOrdersCoffeeExperience();
            this.onSave = false;
            this.onEdit = true;
          }
          else{
            this.toastrService.error("Error while Updating.")
          }
        }
      )
      }
      if(this.order_type == "hrc"){
        this.userService.postHrcOrdersCoffeeExperience(this.roaster_id,this.order_id,data).subscribe(
          response => {
            if(response['success'] == true){
              this.toastrService.success("The Horeca order details updated Successfully")
              this.getHrcOrdersCoffeeExperience();
              this.onSave = false;
              this.onEdit = true;
            }
            else{
              this.toastrService.error("Error while Updating.")
            }
          }
        )
        }
      else{
        this.userService.postDefaultCoffeeExperienceDetail(this.roaster_id,data).subscribe(
          response => {
            if(response['success'] == true){
              this.toastrService.success("The Default settings updated Successfully")
              this.onSave = false;
              this.onEdit = true;
            }
            else{
              this.toastrService.error("Error while Updating.")
            }
          }
        )
      }
    }
  }

  getTagValue(event : any){
    console.log(event.target.value)
  }
  edit(){
    this.onEdit = false;
    this.onSave = true;
  }
}
