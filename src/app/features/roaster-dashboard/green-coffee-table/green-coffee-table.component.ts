import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {DashboardserviceService} from 'src/services/dashboard/dashboardservice.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { data } from 'jquery';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-green-coffee-table',
  templateUrl: './green-coffee-table.component.html',
  styleUrls: ['./green-coffee-table.component.css']
})
export class GreenCoffeeTableComponent implements OnInit {

  public mainData: any[];
  folderId: any;
  estateId: any;

  constructor(public router: Router,
		public cookieService: CookieService,
    public dashboard: DashboardserviceService,
    private roasterService : RoasterserviceService,
    private toastrService : ToastrService,
    public modalService:BsModalService) {
      this.estateId = this.cookieService.get('estate_id');
			this.mainData = 
				[
				{ orderid:  '#67564', datarequested: '23/02/2020', roastername: 'Third Wave Coffee Roasters', ordertype: 'Pre- Booked', buyername:'View details'},
				{ orderid: '#56458', datarequested: '26/03/2020', roastername: 'Origin Coffee Roasters', ordertype: 'Sample', buyername:'View details'},
        { orderid:  '#74397', datarequested: '23/02/2020', roastername: 'Home Brew Coffee', ordertype: 'Booked', buyername:'View details'},
        { orderid:  '#48364', datarequested: '26/03/2020', roastername: 'Blue Tokai Coffee Roasters', ordertype: 'Sample', buyername:'View details'},
        { orderid: '#84343', datarequested: '23/02/2020', roastername: 'Alchemy Coffee Roasters', ordertype: 'Pre- Booked', buyername:'View details'}

			];
		 }



     ngOnInit(): void {
      //Auth checking
      if (this.cookieService.get("Auth") == "") {
        this.router.navigate(["/auth/login"]);
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
  
  shareDetails(size: any){
    this.folderId = size.id;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "folderId": encodeURIComponent(this.folderId),
      }
    }

    // this.router.navigate(['/features/file-share-details'], navigationExtras);
  }  


}
