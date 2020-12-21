import { Injectable } from '@angular/core';
import { UserserviceService } from 'src/services/users/userservice.service';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class ProcessDetailsService {
  facilitatorId:any;
  harvest_id:any;
  dryprocess:any;
  drydescription:any;
  drying_period:any;
  screen_size:any;
  density:any;
  no_of_defects:any;
  preparation:any;
  quality_grade:any;
  moisture_content:any;
  water_activity:any;
  wetprocess:any;
  wetdescription:any;
  fermentation:any;
  parchment_weight:any;
  roasterId:any;
  roaster_id: any;

  constructor(private userService: UserserviceService,private cookieService : CookieService) {
    this.roaster_id = this.cookieService.get('roaster_id');
   }

  viewProcessDetails(){
    this.userService.getProcessDetails(this.roaster_id,this.harvest_id).subscribe(
			res=>{
				if(res['success'] == true){
          console.log(res);
          this.dryprocess=res['result']['dry_milling']['process'];
          this.drydescription=res['result']['dry_milling']['description'];
          this.drying_period=res['result']['dry_milling']['drying_period'];
          this.screen_size=res['result']['dry_milling']['screen_size'];
          this.density=res['result']['dry_milling']['density'];
          this.no_of_defects=res['result']['dry_milling']['no_of_defects'];
          this.preparation=res['result']['dry_milling']['preparation'];
          this.quality_grade=res['result']['dry_milling']['quality_grade'];
          this.moisture_content=res['result']['dry_milling']['moisture_content'];
          this.water_activity=res['result']['dry_milling']['water_activity'];
          this.wetprocess=res['result']['wet_milling']['process'];
          this.wetdescription=res['result']['wet_milling']['description'];
          this.fermentation=res['result']['wet_milling']['fermentation'];
          this.parchment_weight=res['result']['wet_milling']['parchment_weight'];
        }
      }
    )
  }
}
