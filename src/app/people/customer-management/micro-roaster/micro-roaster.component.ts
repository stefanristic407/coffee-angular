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
  selector: 'app-micro-roaster',
  templateUrl: './micro-roaster.component.html',
  styleUrls: ['./micro-roaster.component.css']
})
export class MicroRoasterComponent implements OnInit {

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
				{ microname:  'Ritz Carlton', createdon: '24/09/2019  11:45am', status: 'Active', activeuser: '5', action: 'View details'},
				{ microname: 'Starbucks Coffee', createdon: '24/09/2019  1:00pm', status: 'Disabled', activeuser: '3',  action: 'View details'},
        { microname:  'Café Coffee day', createdon: '13/09/2019  5:00pm', status: 'Active', activeuser: '7',  action: 'View details'},
        { microname: 'Radisson Blu', createdon: '02/09/ 2019 10:07am', status: 'Disabled', activeuser: '1',  action: 'View details'},
				{ microname:  'Sun and Sand', createdon: '02/01/2020  7:23 am ', status: 'Active', activeuser: '2',  action: 'View details'},
        { microname: 'Taj Hotels', createdon: '19/08/ 2019  9:16pm', status: 'Disabled', activeuser: '10',  action: 'View details'}

			];
		 }



     ngOnInit(): void {
      //Auth checking
      if (this.cookieService.get("Auth") == "") {
        this.router.navigate(["/auth/login"]);
      }
      this.getSharedFilesandFolders();
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


  getSharedFilesandFolders(){
    this.roasterService.getSharedFilesandFolders(this.estateId).subscribe(
      result => {
        console.log(result);
        if(result['success']==true){
          // this.mainData = result['result'];
        }else{
          this.toastrService.error("Error while getting the Shared Files and Folders");
        }
      }
    )
  }
 

  deleteFolder(id:any){
    this.roasterService.deleteFolder(this.estateId,id).subscribe(
      data => {
        if(data['success']==true){
          this.toastrService.success("The Selected folder is deleted successfully");
          this.getSharedFilesandFolders();
        }
        else{
          this.toastrService.error("Error while deleting the Folder");
        }
      }
    )
  }
  deleteFile(id:any){
    this.roasterService.deleteFile(this.estateId,id).subscribe(
      data => {
        if(data['success']==true){
          this.toastrService.success("The Selected file is deleted successfully");
          this.getSharedFilesandFolders();
        }
        else{
          this.toastrService.error("Error while deleting the File");
        }
      }
    )
  }

 

}
