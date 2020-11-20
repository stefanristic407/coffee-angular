import { Component, OnInit } from '@angular/core';
import {GlobalsService} from 'src/services/globals.service';
import { UserserviceService } from 'src/services/users/userservice.service';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-new-roasted-batch',
  templateUrl: './new-roasted-batch.component.html',
  styleUrls: ['./new-roasted-batch.component.css']
})
export class NewRoastedBatchComponent implements OnInit {

  cupping_type:any='';
  cupping:any;
  showCupping:boolean = true;
  langChips : any = [];
  selectable = true;
  removable = true;
  appLanguage?: any;
  greenIconShow: boolean = false;
  roaster_id: string;
  roastingProfile: any;
  roasterFlavourProfile: any;
  showDetails : boolean = false;
  notes : any;
  aroma : any;
  flavour : any;
  body : any;
  processing : any;
  acidity : any;
  quantity : any;
  quantity_unit : any = 'kg';
  roast_batch_name: any;


  constructor(  public globals: GlobalsService,
                public userService : UserserviceService,
                public roasterService : RoasterserviceService,
                public toastrService : ToastrService,
                public router : Router,
                public cookieService : CookieService) {
                  this.roaster_id = this.cookieService.get('roaster_id');
                 }

  ngOnInit(): void {
    this.cupping = '';
    this.appLanguage = this.globals.languageJson;
    this.getRoastingProfiles();
    this.getRoasterFlavourProfile();
  }
  setCupping(cuppdata:any){
    this.cupping=cuppdata;
  }
  toggleCupping(){
    this.showCupping=!this.showCupping;
    if(this.showCupping==false){
			document.getElementById('cupping_id').style.border="1px solid #d6d6d6";
		}
		else{
			document.getElementById('cupping_id').style.border="1px solid #d6d6d6";
		
		}
  }

  addLang(value:any) {
    // const input = event.input;
    // const value = event.value;
  
    // Add our fruit
    if ((value || '').trim()) {
      this.langChips.push(value.trim());
    }
  
    // // Reset the input value
    // if (input) {
    //   input.value = '';
    // }
  
  }
  
  remove(lang: string): void {
    const index = this.langChips.indexOf(lang);
  
    if (index >= 0) {
      this.langChips.splice(index, 1);
    }
  }

  getRoastingProfiles(){
    this.roasterService.getRoastingProfile(this.roaster_id).subscribe(
      data => {
        if(data['success'] == true){
          this.roastingProfile = data['result'];
        }else{
          this.toastrService.error("Error while getting the roasting profiles");
        }
      }
    )
  }

  getRoasterFlavourProfile(){
    this.userService.getRoasterFlavourProfile(this.roaster_id).subscribe(
      data => {
        if(data['success'] == true){
          this.roasterFlavourProfile = data['result'];
        }else{
          this.toastrService.error("Error while getting the roasting Flavour Profile");
        }
      }
    )
  }

}
