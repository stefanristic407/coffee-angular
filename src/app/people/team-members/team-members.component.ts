import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import {GlobalsService} from 'src/services/globals.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit {
  termRole: any;
  roaster_id: string;
  roles: any;
  role_id: any;
  termStatus: any;
  teamRole:any;
  showVar: boolean = true;
  showRole:boolean = true;
  term:any;
  appLanguage: any;

  mainData:any[] = [
    {
      name: 'Luis Stanley',
      lastLogin: '24/09/2019 11.45 am',
      Email: 'louis.s@roaster.com',
      status:'Active',
      roles:'support-admin'
    },
    {
      name: 'Lillian Duncan',
      lastLogin: '4/09/2019 7.45 am',
      Email: 'lillian.s@roaster.com',
      status:'Disabled',
      roles:'Marketing'
    },
    {
      name: 'Lillian Duncan',
      lastLogin: '14/11/2019 10.45 am',
      Email: 'samein.s@roaster.com',
      status:'Disabled',
      roles:'support-admin'
    },
    {
      name: 'Javin Duan',
      lastLogin: '24/09/2019 11.45 am',
      Email: 'javin.s@roaster.com',
      status:'Active',
      roles:'Marketing'
    },
    {
      name: 'Lillian Duncan',
      lastLogin: '5/12/2019 4.30 pm',
      Email: 'lillian.s@roaster.com',
      status:'Disabled',
      roles:'Accountant'
    }
  ]
  roleData: string;
  roleID: string;

  
  constructor(public roasterService:RoasterserviceService,public cookieService: CookieService,private router: Router,public route: ActivatedRoute,private globals: GlobalsService) { 
    this.roaster_id = this.cookieService.get('roaster_id');
    this.termStatus = '';
	this.termRole = '';
  }

  ngOnInit(): void {
      //Auth checking
      if (this.cookieService.get("Auth") == "") {
        this.router.navigate(["/auth/login"]);
      }
      this.listRoles();
      this.appLanguage = this.globals.languageJson;
  }
  listRoles() {
    this.roasterService.getRoles(this.roaster_id).subscribe(
      response => {
        this.roles = response['result'];
        this.teamRole = this.roles[0].name;
        this.role_id = this.roles[0].id;
        if (this.route.snapshot.queryParams['roleData'] && this.route.snapshot.queryParams['roleID']) {
          this.roleData = decodeURIComponent(this.route.snapshot.queryParams['roleData']);
          this.roleID = decodeURIComponent(this.route.snapshot.queryParams['roleID']);
          console.log("Data : ", this.roleData);
          this.teamRole = this.roleData;
          this.role_id = this.roleID;
        }
        // this.teamRole = this.roles[0].name;
      }
    )
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
}
