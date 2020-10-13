// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of  share with me.

import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
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
import { PlyrModule } from 'ngx-plyr';
import * as Plyr from 'plyr';
import { GlobalsService } from 'src/services/globals.service';
declare var $ :any;

@Component({
  selector: 'app-sharewithme',
  templateUrl: './sharewithme.component.html',
  styleUrls: ['./sharewithme.component.css']
})
export class SharewithmeComponent implements OnInit {
 
	public mainData: any[];
  folderId: any;
  roasterId: any;

  rangeDates: any;
  modalRef: BsModalRef;
  url: any;
  folderItemId: any;
  folderName: any;
  folderDescription: any;
  file_name: any;
  file_url: any;
  file_description: any;
  file_id: any;
  fileNameValue: any;
  fileEvent: FileList;
  descriptionError: string;
  folderNameError: string;
  fileNameError: string;
  filedescriptionError: string;
  files: any;
  appLanguage: any;
  shareMe:any =0;

  constructor(public router: Router,
		public cookieService: CookieService,
    public dashboard: DashboardserviceService,
    private roasterService : RoasterserviceService,
    private toastrService : ToastrService,
    public fileService : FileShareService,
    public modalService:BsModalService,
    private globals : GlobalsService) {
      this.roasterId = this.cookieService.get('roaster_id');
			// this.mainData = 
			// 	[
			// 	{ files:  'Finca La Pampa - Brand asse..', orderid: '#221669', modified: '-', owner:'Finca La Pampa', type: 'Folder'},
			// 	{ files: 'Roastery Machine Manuals', orderid: '-', modified: '-', owner:'Löfbergs', type: 'Document'},
			// 	{ files:  'Viay - Brand assets', orderid: '#127908', modified: '24/01/2020  11:05pm',owner:'Viay', type: 'CSV'},
			// 	{ files: 'coffee?', orderid: '#727520', modified: '17/03/2020  7:17am', owner:'Simha', type: 'mp4'}
			// ];
		 }


  // Function Name : Open Modal
  // Description: This function helps to get the Id

  openModal(template: TemplateRef<any>,itemId:any,itemName:any,itemDesc:any) {
    this.modalRef = this.modalService.show(template);
    this.folderItemId = itemId;
    this.folderName = itemName;
    this.folderDescription = itemDesc;
    console.log(this.folderName)
  }
  openFileModal(template: TemplateRef<any>,itemId:any) {
    this.modalRef = this.modalService.show(template);
    this.roasterService.getFileDetails(this.roasterId,itemId).subscribe(
      data => {
        if(data['success']==true){
          this.file_name = data['result'].name;
          this.file_id = data['result'].id;
          this.file_description = data['result'].description;
          this.file_url = data['result'].url;
          this.fileNameValue = data['result'].name;
          
        }
      }
    )

  }

     ngOnInit(): void {
      this.appLanguage = this.globals.languageJson;
      //Auth checking
      if (this.cookieService.get("Auth") == "") {
        this.router.navigate(["/auth/login"]);
      }
	  this.getSharedFilesandFolders();
	  this.language();

	}
	language(){
		this.appLanguage = this.globals.languageJson;
		this.shareMe++;
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




      // Open Popup
      popupPrivew(item) {
        var PrivewPopup = $('.priview-popup-fileshare')
        var SetImg = PrivewPopup.find('.img')
        var url = item.url;
        console.log(url)
        SetImg.attr('src', url)
        PrivewPopup.addClass('active');
        document.body.classList.add('popup-open');
    
        setTimeout(function () {
          PrivewPopup.find('.priview-popup-fileshare__img').addClass('active')
        }, 50);
      }
    
      // Close Popup
      popupClose() {
        var PrivewPopup = $('.priview-popup-fileshare')
        PrivewPopup.removeClass('active');
        document.body.classList.remove('popup-open');
        PrivewPopup.find('.priview-popup-fileshare__img').removeClass('active')
      }


      openVideoModal(template: TemplateRef<any>,item:any){
        this.modalRef = this.modalService.show(template);
        this.url=item.url;
        const player = new Plyr('#player');
        $('.popup-video').parents('.modal-content').addClass('video-content')
    
        // $('.popup-video').parents('.modal-content').css({
        //   "padding":"0px !important"
        // })
        // $('.popup-video').parents('.modal-body').css({
        //   "margin-top":"0 !important"
        // })
    
      }
      closePopup(){
        this.modalRef.hide();
      }
      toggleVideo(event: any) {
        // this.videoplayer.nativeElement.play();
        event.toElement.play();
    
    }
    
    downloadFile(item: any) { 
      if (confirm("Please confirm! you want to download?") == true) {
      const a = document.createElement("a"); 
      a.href = item.url ;
      a.download = item.name;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); 
    }
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
          this.mainData = result['result'];
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


  reUploadFile(event:any){
    this.files = event.target.files;
    this.fileEvent = this.files;
    console.log(this.fileEvent);
    this.fileNameValue = this.files[0].name;

  }

  

  UpdateFolder(){
    if (
      this.folderName == "" ||
      this.folderName == null ||
      this.folderName == undefined
    ) {
      this.folderNameError = "Please enter your password";
      document.getElementById("updatefolder_name").style.border =
        "1px solid #D50000 ";
      setTimeout(() => {
        this.folderNameError = "";
      }, 3000);
    } 
    else if (
      this.folderDescription == "" ||
      this.folderDescription == null ||
      this.folderDescription == undefined
    ) {
      this.descriptionError = "Please enter your password";
      document.getElementById("updatefolder_descr").style.border = "1px solid #D50000 ";
      setTimeout(() => {
        this.descriptionError = "";
      }, 3000);
    } 
    else{
      var data = {
        "name": this.folderName,
        "description": this.folderDescription
      }
      
      this.roasterService.updateFolderDetails(this.roasterId,this.folderItemId,data).subscribe(
        result=>{
          if(result['success']==true){
            this.modalRef.hide();
            this.toastrService.success("Folder details updated sucessfully");
            setTimeout(()=>{
              this.fileService.getFilesandFolders();
            },2000);

        }
        else{
          this.toastrService.error("Error while updating details");
          this.modalRef.hide();
        }
      }
      )
    }
  }

  updateFile(){
    // if (
    //   this.fileName == "" ||
    //   this.fileName == null ||
    //   this.fileName == undefined
    // ) {
      // this.fileNameError = "Please enter your password";
    //   document.getElementById("updatefile_name").style.border =
    //     "1px solid #D50000 ";
    //   setTimeout(() => {
    //     this.fileNameError = "";
    //   }, 3000);
    // } 
    // else if (
    //   this.fileDescription == "" ||
    //   this.fileDescription == null ||
    //   this.fileDescription == undefined
    // ) {
      // this.filedescriptionError = "Please enter your password";
    //   document.getElementById("updatefile_descr").style.border = "1px solid #D50000 ";
    //   setTimeout(() => {
    //     this.filedescriptionError = "";
    //   }, 3000);
    // } 
    // else{
     
      let fileList: FileList = this.fileEvent;
      console.log(fileList)
       if(fileList == undefined || fileList == null ){
          // let formData: FormData = new FormData();
          // // formData.append("file", file, file.name);
          // formData.append("name", this.file_name);
          // formData.append("description",this.file_description)
          // this.roasterId = this.cookieService.get("roaster_id");
          // formData.append(
          //   "api_call",
          //   "/ro/" + this.roasterId + "/file-manager/files/" + this.file_id 
          // );
          // formData.append("token", this.cookieService.get("Auth"));
          // this.roasterService.updateFiles(formData).subscribe(
          //   result=>{
          //     if(result['success']==true){
          //       this.toastrService.success("The File has been updated successfully");
          //       this.getFilesandFolders();
          //       this.modalRef.hide();
          //     }else{
          //       this.toastrService.error("Error while updating the file details");
          //       this.modalRef.hide();
          //     }
          //   }
          // )
          this.toastrService.error("Please upload the file to update the details");
        }
        else if (fileList.length > 0) {
          let file: File = fileList[0];
          let formData: FormData = new FormData();
          formData.append("file", file, file.name);
          formData.append("name", this.file_name);
          formData.append("description",this.file_description)
          this.roasterId = this.cookieService.get("roaster_id");
          formData.append(
            "api_call",
            "/ro/" + this.roasterId + "/file-manager/files/" + this.file_id 
          );
          formData.append("token", this.cookieService.get("Auth"));
          this.roasterService.updateFiles(formData).subscribe(
            result=>{
              if(result['success']==true){
                this.toastrService.success("The File has been updated successfully");
                
                this.fileService.getFilesandFolders();
                this.modalRef.hide();
              }else{
                this.toastrService.error("Error while updating the file details");
                this.modalRef.hide();
              }
            }
          )
          }
     
    }
  // }

}
