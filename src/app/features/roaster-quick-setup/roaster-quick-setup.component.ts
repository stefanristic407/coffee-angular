import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {GlobalsService} from 'src/services/globals.service';

@Component({
  selector: 'app-roaster-quick-setup',
  templateUrl: './roaster-quick-setup.component.html',
  styleUrls: ['./roaster-quick-setup.component.css']
})
export class RoasterQuickSetupComponent implements OnInit {
  add_member_name:any;
  add_member_email:any;
  appLanguage: any;
  roaster_id: any;
  inviteActive:any=0;

  constructor(public roasterService:RoasterserviceService,public cookieService: CookieService,private router: Router,    private globals: GlobalsService) {
    this.roaster_id = this.cookieService.get('roaster_id');

   }

  ngOnInit(): void {
    if (this.cookieService.get("Auth") == "") {
      this.router.navigate(["/auth/login"]);
      }
      this.appLanguage = this.globals.languageJson;

      // this.language();
    }
    // language(){
    //   this.appLanguage = this.globals.languageJson;
    //   this.inviteActive++;
    // }
  

}
