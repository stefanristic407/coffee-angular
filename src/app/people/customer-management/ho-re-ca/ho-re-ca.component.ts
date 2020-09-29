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

@Component({
  selector: 'app-ho-re-ca',
  templateUrl: './ho-re-ca.component.html',
  styleUrls: ['./ho-re-ca.component.css']
})
export class HoReCaComponent implements OnInit {

  public mainData: any[];
  folderId: any;
  estateId: any;
  roasterId: any;
	appLanguage: any;

  constructor(public router: Router,
    public cookieService: CookieService,
    public dashboard: DashboardserviceService,
    private roasterService: RoasterserviceService,
    private toastrService: ToastrService,
	public modalService: BsModalService,
	private globals: GlobalsService) {
    this.estateId = this.cookieService.get('estate_id');
    this.roasterId = this.cookieService.get('roaster_id');
    this.mainData =
      [
        // { microname: 'Ritz Carlton', createdon: '24/09/2019  11:45am', status: 'Active', activeuser: '5', action: 'View details' },
        // { microname: 'Starbucks Coffee', createdon: '24/09/2019  1:00pm', status: 'Disabled', activeuser: '3', action: 'View details' },
        // { microname: 'Café Coffee day', createdon: '13/09/2019  5:00pm', status: 'Active', activeuser: '7', action: 'View details' },
        // { microname: 'Radisson Blu', createdon: '02/09/ 2019 10:07am', status: 'Disabled', activeuser: '1', action: 'View details' },
        // { microname: 'Sun and Sand', createdon: '02/01/2020  7:23 am ', status: 'Active', activeuser: '2', action: 'View details' },
        // { microname: 'Taj Hotels', createdon: '19/08/ 2019  9:16pm', status: 'Disabled', activeuser: '10', action: 'View details' }

      ];
  }



  ngOnInit(): void {
    //Auth checking
    if (this.cookieService.get("Auth") == "") {
      this.router.navigate(["/auth/login"]);
    }
    this.MicroRoastersHoreca();
    this.appLanguage = this.globals.languageJson;
  }

  // Function Name : CheckAll
  // Description: This function helps to check all roles of the role list.
  checkAll(ev: any) {
    this.mainData.forEach(x => x.state = ev.target.checked)
  }

  // Function Name : IsAllchecked
  // Description: This function helps to check single role.
  isAllChecked() {
    // return this.mainData.every(_ => _.state);
  }

  shareDetails(size: any) {
    this.folderId = size.id;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "folderId": encodeURIComponent(this.folderId),
      }
    }

    this.router.navigate(['/people/horeca-details'], navigationExtras);
  }



  MicroRoastersHoreca() {
    this.roasterService.getMicroRoastersHoreca(this.roasterId).subscribe(
      data => {
        if (data['success'] == true) {
          if (data['result'] == null || data['result'].length == 0) {
            this.toastrService.error("Table Data is empty");
          }
          else {
            this.mainData = data['result'];
          }
        } else {
          this.toastrService.error("Error while getting the agreement list!");
        }
      }
    )
  }



}
