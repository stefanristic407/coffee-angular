import { Component, OnInit } from '@angular/core';
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
  selector: 'app-roasted-coffee-batches',
  templateUrl: './roasted-coffee-batches.component.html',
  styleUrls: ['./roasted-coffee-batches.component.css']
})
export class RoastedCoffeeBatchesComponent implements OnInit {
  termRole: any;
  roles: any;
  role_id: any;
  termStatus: any;
  teamRole: any;
  showVar: boolean = true;
  showRole: boolean = true;
  term: any;
  odd: boolean = false ;
  appLanguage: any;

  mainData: any[] = [
    //   {
    // 	id: '23092',
    // 	batchname: 'Cambucha',
    // 	estatename: 'Finca La Pampa',
    // 	quantity: '200kg',
    // 	createdon:'24 Jan 2020 ',
    // 	profile:'Mild roast-467'
    //   },
    //   {
    // 	id: '23092',
    // 	batchname: 'Aero940',
    // 	estatename: 'Finca La Pampa',
    // 	quantity: '500kg',
    // 	createdon:'12 Jan 2020',
    // 	profile:'Light - medium 940'
    //   },
    //   {
    // 	id: '39509',
    // 	batchname: 'Mocha038',
    // 	estatename: 'Finca La Toboba',
    // 	quantity: '200kg',
    // 	createdon:'24 Jan 2020 ',
    // 	profile:'Mild roast-467'
    //   },
    //   {
    // 	id: '23092',
    // 	batchname: 'Cambucha',
    // 	estatename: 'Finca La Pampa',
    // 	quantity: '140kg',
    // 	createdon:'13 Oct 2018',
    // 	profile:'Medium458'
    //   },
    //   {
    // 	id: '92830',
    // 	batchname: '2879- dark',
    // 	estatename: 'Asoproaaa',
    // 	quantity: '279kg',
    // 	createdon:'02 Dec 2019',
    // 	profile:'2879- dark'
    // },
    // {
    // 	id: '32940',
    // 	batchname: 'Cambucha',
    // 	estatename: 'Cafe Directo',
    // 	quantity: '450kg',
    // 	createdon:'22 Nov 2019',
    // 	profile:'Light - medium 940'
    // },
    // {
    // 	id: '02901',
    // 	batchname: 'Aero940',
    // 	estatename: 'La Isabela',
    // 	quantity: '217kg',
    // 	createdon:'19 Sep 2019',
    // 	profile:'Medium458'
    //   }
  ]
  roleData: string;
  roleID: string;
  roasterId: any;

  constructor(public router: Router,
    public cookieService: CookieService,
    public dashboard: DashboardserviceService,
    private roasterService: RoasterserviceService,
    private toastrService: ToastrService,
    private globals: GlobalsService) {
    this.termStatus = '';
    this.termRole = '';
    this.roasterId = this.cookieService.get('roaster_id');
  }

  ngOnInit(): void {
    this.roasterCoffeeBatchsData();
    this.appLanguage = this.globals.languageJson;
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
    if (this.showRole == false) {
      document.getElementById('role_id').style.border = "1px solid #30855c";
    }
    else {
      document.getElementById('role_id').style.border = "1px solid #d6d6d6";

    }
  }

  toggleStatus() {
    this.showVar = !this.showVar;
    if (this.showVar == false) {
      document.getElementById('status_id').style.border = "1px solid #30855c";
    }
    else {
      document.getElementById('status_id').style.border = "1px solid #d6d6d6";

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

  // Table data 
  roasterCoffeeBatchsData() {
    this.roasterService.getRoasterCoffeeBatchs(this.roasterId).subscribe(
      data => {
        if (data['success'] == true) {
          if (data['result'] == null || data['result'].length == 0) {
            this.odd = true ;
            this.toastrService.error("Table Data is empty");
          }
          else {
            this.odd = false ;
            this.mainData = data['result'];
          }
        } else {
          this.odd = true ;
          this.toastrService.error("Error while getting the agreement list!");
        }
      }
    )
  }

}
