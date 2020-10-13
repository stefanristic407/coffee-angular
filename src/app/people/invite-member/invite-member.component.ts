import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {GlobalsService} from 'src/services/globals.service';

@Component({
  selector: 'app-invite-member',
  templateUrl: './invite-member.component.html',
  styleUrls: ['./invite-member.component.css']
})
export class InviteMemberComponent implements OnInit {
  teamRole: any;
  role_id: any;
  roles: any;
  roaster_id: any;
  add_member_name:any;
  add_member_email:any;
  appLanguage: any;
  inviteActive:any=0;

  constructor(public roasterService:RoasterserviceService,public cookieService: CookieService,private router: Router,    private globals: GlobalsService
    ) {
    this.roaster_id = this.cookieService.get('roaster_id');
   }

  ngOnInit(): void {
    //Auth checking
	if (this.cookieService.get("Auth") == "") {
    this.router.navigate(["/auth/login"]);
    }
    this.listRoles();
    this.language();
  }
  language(){
    this.appLanguage = this.globals.languageJson;
    this.inviteActive++;
  }

  listRoles() {
    this.roasterService.getRoles(this.roaster_id).subscribe(
      response => {
        this.roles = response['result'];
        this.teamRole = this.roles[0].name;
        this.role_id = this.roles[0].id;
        // if (this.route.snapshot.queryParams['roleData'] && this.route.snapshot.queryParams['roleID']) {
        //   this.roleData = decodeURIComponent(this.route.snapshot.queryParams['roleData']);
        //   this.roleID = decodeURIComponent(this.route.snapshot.queryParams['roleID']);
        //   console.log("Data : ", this.roleData);
        //   this.termRole = this.roleData;
        //   this.role_id = this.roleID;
        // }

		// this.termRole = this.roles[0].name;
		this.inviteActive++;
      }
    )
  }

  setTeamRole(term: any, roleId: any) {
    this.teamRole = term;
    this.role_id = roleId;
  }
}
