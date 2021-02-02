import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalsService } from 'src/services/globals.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  appLanguage?: any;
  brandProfileActive: any = 0;
  banner_file: any;
  intro_file_1: any;
  intro_file_2: any;
  file: any;
  banner_title: string = '';
  intro_title: string = '';
  title: string = '';
  short_description: string = '';
  intro_short_description: string = '';
  roaster_id: string;
  banner_image_name: any;
  intro_image_name_1: string = '';
  intro_image_name_2: string = '';
  file_image_name: any;
  teamList: [] =[];
  select_user = '';
  new_users = '';
  selectedMembers: []=[];
  roasterUsers: any[]=[];
  showAddEmp = true;
  addUserId: any = '';
  assignButtonValue = '';

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
    this.getAboutDetails();
    this.getMembers();
    this.getRoasterUsers();
  }

  language() {
    this.appLanguage = this.globals.languageJson;
    this.brandProfileActive++;
  }

  async getAboutDetails() {
    this.userService.getPageDetails(this.roaster_id, 'about-us').subscribe(async (data) => {
      if (data['result'] != {}) {
        this.title = data['result'].title,
        this.intro_short_description = data['result'].intro_short_description
        this.file = data['result'].file,
        this.banner_title = data['result'].banner_title;
        this.intro_title = data['result'].intro_title;
        this.banner_file = data['result'].banner_file,
        this.short_description = data['result'].short_description,
        this.intro_file_1 = data['result'].intro_file_1,
        this.intro_file_2 = data['result'].intro_file_2
        this.banner_image_name = await this.userService.getFileDetails(this.roaster_id, this.banner_file).pipe(map(response => response['name'])).toPromise();
        this.intro_image_name_1 = await this.userService.getFileDetails(this.roaster_id, this.intro_file_1).pipe(map(response => response['name'])).toPromise();
        this.intro_image_name_2 = await this.userService.getFileDetails(this.roaster_id, this.intro_file_2).pipe(map(response => response['name'])).toPromise();
        this.file_image_name = await this.userService.getFileDetails(this.roaster_id, this.file).pipe(map(response => response['name'])).toPromise();
      }
    })
  }

  //save the upload files
  onFileChange(event: any, width: any, height: any, FieldValue: any) {
    var files = event.target.files;
    // this.fileEvent = this.files;
    if (FieldValue == 'Intro' && files.length != 2) {
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
                  let formData: FormData = new FormData();
                  console.log(files[0])
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
                          this.banner_file = data['result'].id;
                          this.banner_image_name = fileValue.name;
                        }
                        else if (FieldValue == "Intro") {
                          this['intro_file_' + [i + 1]] = data['result'].id;
                          // this.intro_file = data['result'].id;
                          this['intro_image_name_' + [i + 1]] = fileValue.name;
                        }
                        else if (FieldValue == "File") {
                          this.file = data['result'].id;
                          this.file_image_name = fileValue.name;
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
          console.log("Video");
          let fileValue = event.target.files[i];
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
                  this.banner_file = data['result'].id;
                  this.banner_image_name = fileValue.name;
                }
                else if (FieldValue == "Intro") {
                  this['intro_file_' + [i + 1]] = data['result'].id;
                  this['intro_image_name_' + [i + 1]] = fileValue.name;
                }
                else if (FieldValue == "File") {
                  this.file = data['result'].id;
                  this.file_image_name = fileValue.name;
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
      } //for loop
    }
  }

  saveAboutProfile() {
    if (this.banner_title == "" || this.intro_title == "" || this.intro_short_description == "" ||
      this.short_description == "" || this.title == "") {
      this.toastrService.error("Please fill all the fields");
    }
    else {
      var data = {
        banner_file: this.banner_file,
        banner_title: this.banner_title,
        intro_file_1: this.intro_file_1,
        intro_file_2: this.intro_file_2,
        intro_title: this.intro_title,
        intro_short_description: this.intro_short_description,
        // title: this.title,
        title: this.title,
        short_description: this.short_description,
        file: this.file
      }
      this.userService.updateHomeDetails(this.roaster_id, data, 'about-us').subscribe(
        res => {
          if (res['success'] == true) {
            this.toastrService.success("About page Details updated successfully");
            this.route.navigate(['/features/brand-profile']);
          }
          else {
            this.toastrService.error("Error while updating details");
          }
        }
      )
    }
  }

  selectUser(value) {
    this.new_users = value.firstname;
    // console.log(value)
  }

  getRoasterUsers() {
    this.roasterService.getRoasterUsers(this.roaster_id).subscribe((data)=>{
      if(data['success'] == true) {
        this.roasterUsers = data['result'];
      }
    })
  }

  getMembers() {
    this.userService.getTeamMembers(this.roaster_id, 'top-contacts').subscribe((data) =>{
      this.teamList = data['result'];
      console.log(data);
    })
  }

  addMember() {
    // return;
    const payload = {
      user_id: +this.addUserId
    }
    this.roasterService.addRoasterContacts(this.roaster_id, payload).subscribe((data) =>{
      if(data['success'] == true ) {
      this.toastrService.success("Contact added successfully");
      this.showAddEmp = true;
      this.getMembers();
      }
    },(err)=>{
      this.toastrService.error("Error while updating details");
    });
  }

  removeUser(id) {
    this.roasterService.deleteRoasterContacts(this.roaster_id,id).subscribe((data)=>{
      if(data['success'] == true ) {
        this.toastrService.success("Contact removed successfully");
        this.showAddEmp = true;
        this.getMembers();
      }
    },(err)=> {
      this.toastrService.success("Error while updating");
    })
  }

  cancelAssign() {
    this.showAddEmp = true;
  }

}
