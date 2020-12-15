import { Component, OnInit, TemplateRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/services/globals.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserserviceService } from 'src/services/users/userservice.service';

@Component({
  selector: 'app-roasting-profiles',
  templateUrl: './roasting-profiles.component.html',
  styleUrls: ['./roasting-profiles.component.css']
})
export class RoastingProfilesComponent implements OnInit {
  termRole: any;
  roles: any;
  role_id: any;
  termStatus: any;
  teamRole:any;
  showVar: boolean = true;
  showRole:boolean = true;
  term:any;

  mainData:any[] = []
  roleData: string;
  roleID: string;
  roasterId: any ;
  odd: boolean = false ;
  appLanguage?: any;
  profileID: any;
  modalRef: BsModalRef;
  deleteProfileId: any;
  roasterLevels = {
    1: 'Light',
    2: 'Light Medium',
    3: 'Medium',
    4: 'Medium Dark',
    5: 'Dark',
  }
  constructor(
    public router: Router,
    public cookieService: CookieService,
    private roasterService : RoasterserviceService,
    private toastrService : ToastrService,
    public globals: GlobalsService,
    private modalService: BsModalService,
    public userService : UserserviceService) {
    this.termStatus = '';
    this.termRole = '';
    this.roasterId = this.cookieService.get('roaster_id');
   }

   openDeleteModal(template1:TemplateRef<any>,deleteId:any){
    this.modalRef = this.modalService.show(template1);
    this.deleteProfileId = deleteId;
    }


  ngOnInit(): void {
    this.getRoastingProfile();
    this.appLanguage = this.globals.languageJson;
  }

  setTeamRole(term: any, roleId: any) {
    this.teamRole = term;
    this.role_id = roleId;
  }
 // Function Name : Status Filiter
  // Description: This function helps to filiter the users based on the selected status fiiter.

  setStatus(term: any) {
    this.termStatus = term;
    console.log(this.termStatus)
  }
  // Function Name : Roles Filiter
  // Description: This function helps to filiter the users based on the selected roles fiiter. 

  setRole(term: any) {
    this.termRole = term;
  }
  toggleRole() {
    this.showRole = !this.showRole;
    if(this.showRole==false){
      document.getElementById('role_id').style.border="1px solid #30855c";
    }
    else{
      document.getElementById('role_id').style.border="1px solid #d6d6d6";
    
    }
   }
  
   toggleStatus() {
    this.showVar = !this.showVar;
    if(this.showVar==false){
    document.getElementById('status_id').style.border="1px solid #30855c";
  }
  else{
    document.getElementById('status_id').style.border="1px solid #d6d6d6";
  
  }
  }
  // Function Name : CheckAll
  // Description: This function helps to check all roles of the role list.
  checkAll(ev: any) {
    if(this.odd!){
    this.mainData.forEach(x => x.state = ev.target.checked)
    }
  }

  // Function Name : IsAllchecked
  // Description: This function helps to check single role.
  isAllChecked() {
    if(this.odd!){
    return this.mainData.every(_ => _.state);
    }
  } 

  getRoastingProfile(){
		this.roasterService.getRoastingProfile(this.roasterId).subscribe(
			data => {
				if(data['success']==true){
          if ( data['result'] == null || data['result'].length == 0) {
            this.odd = true ;
            this.toastrService.error("Table Data is empty");
          }
          else {
            this.odd = false ;
            this.mainData = data['result'];
            this.mainData.forEach(ele => {
              ele.roast_level_name = this.roasterLevels[ele.roast_level];
            })
          }
        }else{
          this.odd = true ;
					this.toastrService.error("Error while getting the agreement list!");
				}
			}
		)
  }
  
  redirectToEdit(item){
    this.profileID = item;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "profileID": encodeURIComponent(this.profileID),
      }
    }

    this.router.navigate(['/features/create-roasting-profile'], navigationExtras);
  }

  deleteRoastingProfile(deleteId : any){
    this.userService.deleteRoastingProfile(this.roasterId,deleteId).subscribe(
      data => {
        if(data['success'] = true){
          this.toastrService.success("Roasting profile deleted successfully");
          this.getRoastingProfile();
        }
        else{
          this.toastrService.error("Error while deletign the roasting profile");
        }
      }
    )
  }
}
