import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/services/globals.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from 'src/services/users/userservice.service';

@Injectable({
  providedIn: 'root'
})
export class CuppingReportService {
  	roaster_id: any;
	reportsList: any;

  constructor(private userService:UserserviceService, 
    private toasterService: ToastrService, private router: Router,
    public globals: GlobalsService,private cookieService : CookieService) {
      this.roaster_id = this.cookieService.get('roaster_id');

    }
	getCuppingReports(){
		this.userService.listCuppingReports(this.roaster_id).subscribe(
			res=>{
				if(res['success'] == true){
					this.reportsList = res['result'];
				}
				else{
					this.toasterService.error("Error while listing Cupping Reports.")
				}
			}
		)
	} 
}
