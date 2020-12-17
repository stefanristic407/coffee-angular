import { Injectable } from '@angular/core';
import { UserserviceService } from 'src/services/users/userservice.service';


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

  constructor(private userService: UserserviceService) { }

  viewProcessDetails(){
    this.userService.getProcessDetails(this.roasterId,this.harvest_id).subscribe(
			res=>{
				if(res['success'] == true){
          console.log(res);
          this.dryprocess=res['result']['process'];
          this.drydescription=res['result']['description'];
          this.drying_period=res['result']['drying_period'];
          this.screen_size=res['result']['screen_size'];
          this.density=res['result']['density'];
          this.no_of_defects=res['result']['no_of_defects'];
          this.preparation=res['result']['preparation'];
          this.quality_grade=res['result']['quality_grade'];
          this.moisture_content=res['result']['moisture_content'];
          this.water_activity=res['result']['water_activity'];
          this.wetprocess=res['result']['process'];
          this.wetdescription=res['result']['description'];
          this.fermentation=res['result']['fermentation'];
          this.parchment_weight=res['result']['parchment_weight'];
        }
      }
    )
  }
}
