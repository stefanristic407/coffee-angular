import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserserviceService } from 'src/services/users/userservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-roasting-profile',
  templateUrl: './create-roasting-profile.component.html',
  styleUrls: ['./create-roasting-profile.component.css']
})
export class CreateRoastingProfileComponent implements OnInit {
  appLanguage?: any;
  profile_name : any;
  roast_level : any;
  temperature : any;
  roast_duration : any;
  machine_type : any;

  roastDurationErrorMessage : string = '';
  temperatureErrorMessage : string = "";
  roastLevelErrorMessage : string = '';
  nameErrorMessage : string = '';
  machineTypeErrorMessage : string = '';
  roaster_id: string;
  loginButtonValue : string = "Save";
  profileId: string;
  editFlag: boolean = false;
  constructor( public globals: GlobalsService, public cookieService : CookieService,
               public router : Router, public route : ActivatedRoute, private userService : UserserviceService,
               public toastrService : ToastrService
                ) { 
                  this.roaster_id = this.cookieService.get('roaster_id');
                }

  ngOnInit(): void {
    this.appLanguage = this.globals.languageJson;

    if (this.route.snapshot.queryParams['profileID']) {
      this.editFlag = true;
      this.profileId = decodeURIComponent(this.route.snapshot.queryParams['profileID']);
      this.getRoastingProfile();
    }
  }

  getRoastingProfile(){
    this.userService.getRoastingProfileDetail(this.roaster_id,this.profileId).subscribe(
      data => {
        if(data['success'] == true){
          this.profile_name = data['result'].roast_profile_name;
          this.roast_level = data['result'].roast_level;
          this.temperature = data['result'].temperature;
          this.roast_duration = data['result'].roast_duration;
          this.machine_type = data['result'].machine_type;
        }
      }
    )
  }

  addRoastingProfile(){
    this.loginButtonValue = "Saving";
    if (this.profile_name == "" || this.roast_level == '' || this.roast_duration == '' || this.machine_type == '' || this.temperature == '') {
      this.nameErrorMessage = "Please enter name";
      this.machineTypeErrorMessage = "Please enter machine type";
      this.temperatureErrorMessage = "Please enter temperature";
      this.roastDurationErrorMessage = "Please enter duration";
      this.roastLevelErrorMessage = "Please select roast level";
      document.getElementById('profile_name').style.border = "1px solid #D50000";
      document.getElementById('roast_level').style.border = "1px solid #D50000";
      document.getElementById('roast_duration').style.border = "1px solid #D50000";
      document.getElementById('machine_type').style.border = "1px solid #D50000";
      document.getElementById('temperature').style.border = "1px solid #D50000";
      setTimeout(() => {
        this.nameErrorMessage = "";
        this.machineTypeErrorMessage = "";
        this.temperatureErrorMessage = "";
        this.roastDurationErrorMessage = "";
        this.roastLevelErrorMessage = "";
      }, 4000);
    }
    else{
      
      var data = {
        'roast_profile_name' : this.profile_name,
        "roast_level": parseInt(this.roast_level),
        "roast_duration": parseInt(this.roast_duration),
        "temperature": parseInt(this.temperature),
        "machine_type": this.machine_type
      }
      if(this.editFlag == true){
        this.userService.updateRoastingProfileDetail(this.roaster_id,this.profileId,data).subscribe(
          res => {
            if(res['success'] == true){
              this.loginButtonValue = "Save";
            this.toastrService.success("The Roasting Profile has been Updated.");
            this.router.navigate(['/features/roasting-profile']);
            }
            else{
              this.loginButtonValue = "Save";
              this.toastrService.error("Error while updating the roasting profile");
            }
          }
        )
      }else{
      this.userService.addRoastingProfile(this.roaster_id,data).subscribe(
        response => {
          if(response['success'] == true){
            this.loginButtonValue = "Save";
            this.toastrService.success("The Roasting Profile has been added.");
            this.router.navigate(['/features/roasting-profile']);
          }
          else{
            this.loginButtonValue = "Save";
            this.toastrService.error("Error while adding the roasting profile");
          }
        }
      )}
    }
  }

}
