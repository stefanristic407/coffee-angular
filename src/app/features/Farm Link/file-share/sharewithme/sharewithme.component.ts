// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of  share with me.

import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {DashboardserviceService} from 'src/services/dashboard/dashboardservice.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { data } from 'jquery';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { FileShareComponent } from '../file-share.component';
import { FileShareService } from '../file-share.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sharewithme',
  templateUrl: './sharewithme.component.html',
  styleUrls: ['./sharewithme.component.css']
})
export class SharewithmeComponent implements OnInit {
 
	public mainData: any[];
  folderId: any;
  roasterId: any;

  constructor(public router: Router,
		public cookieService: CookieService,
    public dashboard: DashboardserviceService,
    private roasterService : RoasterserviceService,
    private toastrService : ToastrService,
    public fileService : FileShareService,
    public modalService:BsModalService) {
      this.roasterId = this.cookieService.get('roaster_id');
			this.mainData = 
				[
				{ files:  'Finca La Pampa - Brand asse..', orderid: '#221669', modified: '-', owner:'Finca La Pampa', type: 'Folder'},
				{ files: 'Roastery Machine Manuals', orderid: '-', modified: '-', owner:'Löfbergs', type: 'Document'},
				{ files:  'Viay - Brand assets', orderid: '#127908', modified: '24/01/2020  11:05pm',owner:'Viay', type: 'CSV'},
				{ files: 'coffee?', orderid: '#727520', modified: '17/03/2020  7:17am', owner:'Simha', type: 'mp4'}
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

    this.router.navigate(['/features/file-share-details'], navigationExtras);
  }  


  getSharedFilesandFolders(){
    this.roasterService.getSharedFilesandFolders(this.roasterId).subscribe(
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
    this.roasterService.deleteFolder(this.roasterId,id).subscribe(
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
    this.roasterService.deleteFile(this.roasterId,id).subscribe(
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

  pinFileorFolder(id:any){
    this.roasterService.pinFileorFolder(this.roasterId,id).subscribe(
      data => {
        if(data['success']==true){
          this.toastrService.success("The Selected file/folder is pinned successfully");
           // Calling the Grade info component by creating object of the component and accessing its methods

//  let callPinnedDetails = new FileShareComponent(this.router,this.dashboard,this.toastrService,this.cookieService,this.roasterService,this.fileService,this.modalService);
//  callPinnedDetails.getPinnedFilesorFolders();
this.fileService.getPinnedFilesorFolders();
        }
        else{
          this.toastrService.error("Error while pinning the File/Folder");
        }
      }
    )
  }

}
