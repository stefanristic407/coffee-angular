import { Component, OnInit } from '@angular/core';
import { RoasteryProfileService } from '../roastery-profile.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sewn-about-roastery',
  templateUrl: './about-roastery.component.html',
  styleUrls: ['./about-roastery.component.css']
})
export class AboutRoasteryComponent implements OnInit {

  owner_name : string;
  founded_in : any;
  summary : string;
  kgs:any = '';
  capacity:string;
  capabilities : string;
  male_num : string;
  female_num : string;
  employee_avg : any;
  employee_nos : any;
  brand_name : string;
  short_descr : string;
  // emp_title : string;
  emp_name : string = ''

  ownerNameError : string;
  foundedInError : string;
  employeeNoError : string;
  employeeAvgError : string;
  femaleNumError : string;
  maleNumError : string;
  capacityError : string;
  kilogramsError : string;
  capabilitiesError : string;
  brandNameError : string;
  brandLogoError : string;
  shortDescError : string;
  // empTitleError : string;
  empNameError : string;
  roasterId: any;
  certificatesArray : any = [];

  constructor(public roasteryProfileService : RoasteryProfileService,
              public userService : UserserviceService,
              private cookieService : CookieService,
              private toastrService : ToastrService) { 
                this.roasterId = this.cookieService.get('roaster_id');
              }

  ngOnInit(): void {

this.getCertificates();
   
  }
getCertificates(){
  this.userService.getCertificates(this.roasterId).subscribe(
    result => {
        if(result['success'] == true){
          this.certificatesArray = result['result'];
        }else{
          this.toastrService.error("Error in loading Roaster Certificates");
        }
  });
}
  
  onKeyPress(event: any) {
    if (event.target.value == "") {
      document.getElementById(event.target.id).style.border = "1px solid #D50000";
    } else {
      document.getElementById(event.target.id).style.border = "1px solid #d6d6d6";
    }
  
}

editCertificate(event , certificates : any){
console.log("button clicked" , certificates.name);
}
deleteCertificate(certificateId : any){
  if (confirm("Please confirm! you want to delete?") == true){
  this.userService.deleteCertificate(this.roasterId,certificateId).subscribe(
    response => {
      if(response['success']==true){
        this.toastrService.success("The selected Certificate has been successfully deleted");
        this.getCertificates();
      }
      else{
        this.toastrService.error("Something went wrong while deleting the certificate")
      }
    }
  )
  }
}

}
