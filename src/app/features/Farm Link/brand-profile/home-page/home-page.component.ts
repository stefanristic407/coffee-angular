import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  appLanguage?: any;
  brandProfileActive: any = 0;
  roaster_id: string;
  banner_id: any;
  intro_id: any;
  wizard_id: any;
  traceability_id_1: any;
  traceability_id_2: any;
  substainability_id_1: any;
  substainability_id_2: any;
  feature_id: any;
  banner_image_name: any;
  intro_image_name: any;
  wizard_image_name: any;
  traceability_image_name_1: string = '';
  traceability_image_name_2: string = '';
  substainability_image_name_1: string = '';
  substainability_image_name_2: string = '';

  feature_image_name: any;
  banner_title: string = '';
  intro_title: string = '';
  estate_desc: string = '';
  wizard_title: string = '';
  wizard_heading: string = '';
  traceability_title: string = '';
  traceability_heading: string = '';
  substainability_title: string = '';
  substainability_heading: string = '';

  constructor(public globals: GlobalsService,
    private toastrService: ToastrService,
    public cookieService: CookieService,
    public userService: UserserviceService,
    public route: Router,
    public roasterService: RoasterserviceService) {
    this.roaster_id = this.cookieService.get("roaster_id");

  }

  ngOnInit(): void {
    this.language();
    this.getHomeDetails();
  }

  language() {
    this.appLanguage = this.globals.languageJson;
    this.brandProfileActive++;
  }


  onFileChange(event: any, width: any, height: any, FieldValue: any) {
    var files = event.target.files;
    // this.fileEvent = this.files;
    if ((FieldValue == 'Traceability' || FieldValue == 'Substainability') && files.length != 2) {
      if (files.length > 2) {
        this.toastrService.error("You can only upload a maximum of 2 files");
        return;
      } else {
        this.toastrService.error("Please upload 2 files");
        return;
      }
    }
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].type == "image/png" || files[i].type == "image/jpg" || files[i].type == "image/jpeg" || files[0].type == "image/gif") {
          let reader = new FileReader();
          let img = new Image();
          let fileValue = event.target.files[i];
          // console.log(fileValue)
          img.src = window.URL.createObjectURL(fileValue);
          reader.readAsDataURL(fileValue);
          reader.onload = () => {
            setTimeout(() => {
              const widthValue = img.naturalWidth;
              const heightValue = img.naturalHeight;

              window.URL.revokeObjectURL(img.src);
              // console.log(widthValue + '*' + widthValue);
              if (widthValue === width && widthValue === height) {
                alert(`photo should be ${width} x ${height} size`);
              } else {
                var imgURL = reader.result;
                if (imgURL) {
                  let formData: FormData = new FormData();
                  let fileName = fileValue.name;
                  formData.append("file", fileValue, fileName);
                  formData.append("name", fileName);
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
                          this.banner_image_name = fileName;
                        }
                        else if (FieldValue == "Traceability") {
                          this['traceability_id_' + [i + 1]] = data['result'].id
                          // this.traceability_id = data['result'].id;
                          this['traceability_image_name_' + [i + 1]] = fileName;
                        }
                        else if (FieldValue == "Substainability") {
                          this['substainability_id_' + [i + 1]] = data['result'].id;
                          this['substainability_image_name_' + [i + 1]] = fileName;
                        }
                        else if (FieldValue == "Feature") {
                          this.feature_id = data['result'].id;
                          this.feature_image_name = fileName;
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
        else if (files[i].type == "video/mp4" || files[i].type == "video/mpeg" ||
          files[i].type == "video/mov" || files[i].type == "video/wmv" ||
          files[i].type == "video/flv" || files[i].type == "video/webm") {
          let fileValue = event.target.files[i];
          console.log("Video", fileValue);
          let formData: FormData = new FormData();
          formData.append("file", fileValue, fileValue.name);
          formData.append("name", fileValue.name);
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
                  this.banner_image_name = fileValue.name;
                }
                else if (FieldValue == "Traceability") {
                  this['traceability_id_' + [i + 1]] = data['result'].id;
                  this['traceability_image_name_' + [i + 1]] = fileValue.name;
                }
                else if (FieldValue == "Substainability") {
                  this['substainability_id_' + [i + 1]] = data['result'].id;
                  this['substainability_image_name_' + [i + 1]] = fileValue.name;
                }
                else if (FieldValue == "Feature") {
                  this.feature_id = data['result'].id;
                  this.feature_image_name = fileValue.name;
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
      }//for
    }
  }


  saveHomeProfile() {
    if (this.banner_title == "" || this.intro_title == "" || this.estate_desc == "" ||
      this.wizard_title == "" || this.wizard_heading == "" || this.traceability_title == "" || this.traceability_heading == ""
      || this.substainability_title == "" || this.substainability_heading == "") {
      this.toastrService.error("Please fill all the fields");
    }
    else {
      var data = {
        banner_file: this.banner_id,
        banner_title: this.banner_title,
        intro_title: this.intro_title,
        short_description: this.estate_desc,
        // title: this.title,
        wizard_title: this.wizard_title,
        wizard_sub_heading: this.wizard_heading,
        traceability_story_title: this.traceability_title,
        traceability_story_sub_heading: this.traceability_heading,
        traceability_story_file_1: this.traceability_id_1,
        traceability_story_file_2: this.traceability_id_2,
        sustainability_title: this.substainability_title,
        sustainability_sub_heading: this.substainability_heading,
        sustainability_file_1: this.substainability_id_1,
        sustainability_file_2: this.substainability_id_2,
        shop_title: 'shop_title',
        blog_title: 'blog_title'
      }
      this.userService.updateHomeDetails(this.roaster_id, data, 'home-page').subscribe(
        res => {
          if (res['success'] == true) {
            this.toastrService.success("Home page Details updated successfully");
            this.route.navigate(['/features/brand-profile']);
          }
          else {
            this.toastrService.error("Error while updating details");
          }
        }
      )
    }
  }

  async getHomeDetails() {
    this.userService.getPageDetails(this.roaster_id, 'home-page').subscribe(async (data) => {
      if (data['result'] != {}) {
        this.banner_title = data['result'].banner_title;
        this.intro_title = data['result'].intro_title;
        this.wizard_heading = data['result'].wizard_sub_heading;
        this.estate_desc = data['result'].short_description;
        this.wizard_title = data['result'].wizard_title;
        this.substainability_heading = data['result'].sustainability_sub_heading;
        this.substainability_title = data['result'].sustainability_title;
        this.traceability_title = data['result'].traceability_story_title;
        this.traceability_heading = data['result'].traceability_story_sub_heading;
        this.banner_id = data['result'].banner_file;
        this.traceability_id_1 = data['result'].traceability_story_file_1;
        this.traceability_id_2 = data['result'].traceability_story_file_2;

        this.substainability_id_1 = data['result'].sustainability_file_1;
        this.substainability_id_2 = data['result'].sustainability_file_2;

        this.banner_image_name = await this.userService.getFileDetails(this.roaster_id, this.banner_id).pipe(map(response => response['name'])).toPromise();
        this.traceability_image_name_1 = await this.userService.getFileDetails(this.roaster_id, this.traceability_id_1).pipe(map(response => response['name'])).toPromise();
        this.traceability_image_name_2 = await this.userService.getFileDetails(this.roaster_id, this.traceability_id_2).pipe(map(response => response['name'])).toPromise();

        this.substainability_image_name_1 = await this.userService.getFileDetails(this.roaster_id, this.substainability_id_1).pipe(map(response => response['name'])).toPromise();
        this.substainability_image_name_2 = await this.userService.getFileDetails(this.roaster_id, this.substainability_id_2).pipe(map(response => response['name'])).toPromise();
      }
    })
  }
}
