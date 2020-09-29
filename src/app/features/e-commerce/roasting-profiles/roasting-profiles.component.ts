import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';

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

  mainData:any[] = [
  //   {
	// 	roastname: 'Mild roast-467',
	// 	roastlevel: 'Medium',
	// 	temperature: '600°C',
	// 	duration:'6 min'
  //   },
  //   {
	// 	roastname: 'Light - medium 940',
	// 	roastlevel: 'Light - medium',
	// 	temperature: '400°C',
	// 	duration:'3 min'
  //   },
  //   {
	// 	roastname: 'Medium458',
	// 	roastlevel: 'Medium',
	// 	temperature: '670°C',
	// 	duration:'5.5 min'
  //   },
  //   {
	// 	roastname: '2879- dark',
	// 	roastlevel: 'Dark',
	// 	temperature: '800°C',
	// 	duration:'-'
  //   },
  //   {
	// 	roastname: 'Light - medium 940',
	// 	roastlevel: 'Light',
	// 	temperature: '670°C',
	// 	duration:'5 min'
	// },
	// {
	// 	roastname: 'Medium458',
	// 	roastlevel: 'Dark',
	// 	temperature: '900°C',
	// 	duration:'9 min'
	// }
  ]
  roleData: string;
  roleID: string;
  roasterId: any ;
 
  constructor(
    public router: Router,
    public cookieService: CookieService,
    private roasterService : RoasterserviceService,
    private toastrService : ToastrService,) {
    this.termStatus = '';
    this.termRole = '';
    this.roasterId = this.cookieService.get('roaster_id');
   }

  ngOnInit(): void {
    this.getRoastingProfile();
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
    this.mainData.forEach(x => x.state = ev.target.checked)
  }

  // Function Name : IsAllchecked
  // Description: This function helps to check single role.
  isAllChecked() {
    return this.mainData.every(_ => _.state);
  } 

  getRoastingProfile(){
		this.roasterService.getRoastingProfile(this.roasterId).subscribe(
			data => {
				if(data['success']==true){
					this.mainData = data['result'];
				}else{
					this.toastrService.error("Error while getting the agreement list!");
				}
			}
		)
	}
}
