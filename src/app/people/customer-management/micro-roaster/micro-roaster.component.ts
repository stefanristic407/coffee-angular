import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DashboardserviceService } from 'src/services/dashboard/dashboardservice.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { data } from 'jquery';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {GlobalsService} from 'src/services/globals.service';
import {environment} from 'src/environments/environment';
import { CustomerServiceService } from '../customer-service.service';

@Component({
  selector: 'app-micro-roaster',
  templateUrl: './micro-roaster.component.html',
  styleUrls: ['./micro-roaster.component.css']
})
export class MicroRoasterComponent implements OnInit {

  public mainData: any[];
  folderId: any;
  roasterId: any;
  odd: boolean = false ;
  appLanguage?: any;
  microActive:any=0;
  microRoasterWeb : string = 'https://qa-micro-roaster.sewnstaging.com';
  constructor(public router: Router,
    public cookieService: CookieService,
    public dashboard: DashboardserviceService,
    private roasterService: RoasterserviceService,
    private toastrService: ToastrService,
    public modalService: BsModalService,
	public globals: GlobalsService,
	public customer:CustomerServiceService) {
	this.roasterId = this.cookieService.get('roaster_id');
	
	
    // this.mainData = 
    // 	[
    // 	{ microname:  'Ritz Carlton', createdon: '24/09/2019  11:45am', status: 'Active', activeuser: '5', action: 'View details'},
    // 	{ microname: 'Starbucks Coffee', createdon: '24/09/2019  1:00pm', status: 'Disabled', activeuser: '3',  action: 'View details'},
    //   { microname:  'Café Coffee day', createdon: '13/09/2019  5:00pm', status: 'Active', activeuser: '7',  action: 'View details'},
    //   { microname: 'Radisson Blu', createdon: '02/09/ 2019 10:07am', status: 'Disabled', activeuser: '1',  action: 'View details'},
    // 	{ microname:  'Sun and Sand', createdon: '02/01/2020  7:23 am ', status: 'Active', activeuser: '2',  action: 'View details'},
    //   { microname: 'Taj Hotels', createdon: '19/08/ 2019  9:16pm', status: 'Disabled', activeuser: '10',  action: 'View details'}

    // ];
  }



  ngOnInit(): void {
    //Auth checking
    if (this.cookieService.get("Auth") == "") {
      this.router.navigate(["/auth/login"]);
    }
    this.getMicroRoaster();
    this.language();
  }

  language(){
    this.appLanguage = this.globals.languageJson;
    this.microActive++;
  }
  

  shareDetails(size: any) {
	if(size.status == 'PENDING')  {

	}
	else{
		this.folderId = size.id;
		let navigationExtras: NavigationExtras = {
		  queryParams: {
			"folderId": encodeURIComponent(this.folderId),
		  }
		}
	
		this.router.navigate(['/people/micro-roaster-details'], navigationExtras);
	}

  }

  getMicroRoaster() {
    
    this.roasterService.getMicroRoasters(this.roasterId).subscribe(
      data => {
        if ( data['success'] == true ) {
          if ( data['result'] == null || data['result'].length == 0) {
            this.odd = true ;
            this.toastrService.error("Table Data is empty");
          }
          else {
            this.odd = false ;
            this.mainData = data['result'];
		  }
		  this.microActive++;
        } 
        else {
          this.odd = true ;
          this.toastrService.error("Error while getting the table list!");
        }
      }
    )
  }
 
// Function Name : CheckAll
  // Description: This function helps to check all roles of the role list.
  checkAll(ev: any) {
    // if(this.odd!){
    this.mainData.forEach(x => x.state = ev.target.checked)
    // }
  }

  // Function Name : IsAllchecked
  // Description: This function helps to check single role.
  isAllChecked() {
    // if(this.odd!){
    return this.mainData.every(_ => _.state);
    // }
  }

}
