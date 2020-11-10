// AUTHOR : Vijaysimhareddy
// PAGE DESCRIPTION : This page contains functions of  My files.

import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {DashboardserviceService} from 'src/services/dashboard/dashboardservice.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { data } from 'jquery';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { FileShareService } from '../file-share.service';
import { FileShareComponent } from '../file-share.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PlyrModule } from 'ngx-plyr';
import * as Plyr from 'plyr';
declare var $ :any;

import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'app-myfiles',
  templateUrl: './myfiles.component.html',
  styleUrls: ['./myfiles.component.css']
})
export class MyfilesComponent implements OnInit {

  rangeDates: any;
  modalRef: BsModalRef;
  
	//dtInstance:DataTables.Api;

	// Static Estate Orders Data List
	public data: any;
	public mainData: any[];
  roasterId: string;
  folderId: any;
  parentId: any = 0;
  folderItemId: any;
  folderName: any;
  folderDescription: any;
  folderNameError: string;
  descriptionError: string;
  file_name: any;
  file_id: any;
  file_description: any;
  file_url: any;
  fileName: string;
  fileNameError: string;
  fileDescription: string;
  filedescriptionError: string;
  fileNameValue: any;
  files: any;
  fileEvent: any;
  url: any;
  share_permission: string;
  user_id_value: any;
  company_type: any;
  company_id: any;
  typedValue: any;
  usersList: any;
  selectedOption: any;
  sharedUserslists: any = [];
  sharedUsers: any;
  shareFileId: any;
  myFiles:any=0;
  selectedValue: string;
  appLanguage?: any;
	deleteFolderId: any;
	deleteFileId: any;
  constructor(public router: Router,
		public cookieService: CookieService,
    public dashboard: DashboardserviceService,
    public roasterService : RoasterserviceService,
    public toastrService : ToastrService,
    public fileService : FileShareService,
    private modalService: BsModalService,
    private globals : GlobalsService
    ) {
      this.roasterId = this.cookieService.get('roaster_id');
    
      this.folderNameError= "";
    this.descriptionError = "";

			// this.mainData = 
			// 	[
			// 	{ files:  'SEWN Sales & Concept prese..', orderid: '#221669', modified: '-', type: 'Folder'},
			// 	{ files:  'SEWN service offerings', orderid: '-', modified: '-',  type: 'Document'},
			// 	{ files: 'Löfbergs - Brand assets', orderid: '#127908', modified: '24/01/2020  11:05pm', type: 'CSV'},
			// 	{ files: 'Löfbergs - Machineries', orderid: '-', modified: '27/02/2020  4:17pm', type: 'CSV'},
			// 	{ files: 'What is coffee?', orderid: '#727520', modified: '17/03/2020  7:17am', type: 'mp4'}
			
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
      // var fileModule = "File-Share";
      //Toggle Esstate active
	  $('.btn-switch').click(function() {
      var $group = $(this).closest('.cardpanel-detail');
      $('.btn-switch', $group).removeClass("active");
      $(this).addClass("active");
      });
      $(".activate-toggle").click(function() {
      $(".cardpanel-detail").fadeIn();
       $(".table-details").fadeOut();
        $(".remove-toggle").removeClass('active');
       // $(".cardpanel-detail").addClass('active')
      });
      $(".remove-toggle").click(function() {
      $(".table-details").fadeIn();
       $(".cardpanel-detail").fadeOut();
      $(".activate-toggle").removeClass('active');
      
      });
  
      //Auth checking
      if (this.cookieService.get("Auth") == "") {
        this.router.navigate(["/auth/login"]);
      }
        this.fileService.getFilesandFolders();
        this.language();
        // this.sharedUsersLists()
      }

      language(){
        this.appLanguage = this.globals.languageJson;
           this.myFiles++;
        }

      openShareModal(shareTemplate : TemplateRef<any>,item : any){
        this.shareFileId = item.id;
    this.modalRef = this.modalService.show(shareTemplate);
    this.sharedUsersLists();
	  }
	openDeleteModal(deleteTemplate:TemplateRef<any>,deleteId:any){
		this.modalRef = this.modalService.show(deleteTemplate);
		this.deleteFolderId = deleteId;
	}
	openFileDeleteModal(deleteFileTemplate:TemplateRef<any>,deleteFileId:any){
		this.modalRef = this.modalService.show(deleteFileTemplate);
		this.deleteFileId = deleteFileId;
	}
    
    sharedUsersLists(){
      console.info(this.shareFileId)
      this.roasterService.getSharedUserList(this.roasterId,this.shareFileId).subscribe(
        response => {
          if(response['success'] == true){
            console.log(response)
            this.sharedUserslists = response['result'];
            this.sharedUsers = this.sharedUserslists.length;
            
          }else{
            this.toastrService.error("Error while getting the shared users");
          }
        }
      )
    }

   
    onSelect(event: TypeaheadMatch): void {
      this.selectedOption = event.item;
      console.log(this.selectedOption.id);
      this.user_id_value = this.selectedOption.id;
      this.company_id = this.selectedOption.organization_id;
      this.company_type = this.selectedOption.organization_type;
    }
    
    getUsersList(e :any){
      this.typedValue = e.target.value; 
      if(this.typedValue.length > 4){
      this.roasterService.getUsersList(this.typedValue).subscribe(
        data => {
          if(data['success']==true){
            this.usersList = data['result'];
          }else{
            this.toastrService.error("Error while fetching users list");
          }
        }
      )
    }
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

    
	
  // Function Name : CheckAll
  // Description: This function helps to check all roles of the role list.
  checkAll(ev: any) {
    this.fileService.mainData.forEach(x => x.state = ev.target.checked)
  }

  // Function Name : IsAllchecked
  // Description: This function helps to check single role.
  isAllChecked() {
    // return this.mainData.every(_ => _.state);
  }

  shareDetails(size: any){
    this.folderId = size.id;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "folderId": this.folderId,
      }
    }

    this.router.navigate(['/features/file-share-details'], navigationExtras);
  }  


 


  deleteFolder(id:any){
    // if (confirm("Please confirm! you want to delete?") == true) {
    this.roasterService.deleteFolder(this.roasterId,id).subscribe(
      data => {
        if(data['success']==true){
          this.toastrService.success("The Selected folder is deleted successfully");
          setTimeout(()=>{
            this.fileService.getFilesandFolders();
          },2000);
        }
        else{
          this.toastrService.error("Error while deleting the Folder");
        }
      }
    )
    // }
  }
  deleteFile(id:any){
    // if (confirm("Please confirm! you want to delete?") == true) {
    this.roasterService.deleteFile(this.roasterId,id).subscribe(
      data => {
        if(data['success']==true){
          this.toastrService.success("The Selected file is deleted successfully");
          setTimeout(()=>{
            this.fileService.getFilesandFolders();
          },2500);
        }
        else{
          this.toastrService.error("Error while deleting the File");
        }
      }
    )
    // }
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
    //   this.fileNameError = "Please enter your password";
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
    //   this.filedescriptionError = "Please enter your password";
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

  shareFileAndFolder(){
    var file_id = this.shareFileId;
    var share_permission = document.getElementById('share_permission').innerHTML;
    if(share_permission == "Can view"){
      this.share_permission = "VIEW";
    }else if(share_permission == "Can edit"){
      this.share_permission = "EDIT";
    }
    var shareData = {
      "user_id" : this.user_id_value,
      "permission" : this.share_permission,
      "company_type" : this.company_type,
      "company_id" : this.company_id
    }
    console.log(shareData)
    this.roasterService.shareFolder(this.roasterId,file_id,shareData).subscribe(
      res => {
        if(res['success']==true){
          this.sharedUsersLists();
          this.toastrService.success("The folder has been shared to the User sucessfully!")
        }
        else{
          this.toastrService.error("Error while sharing the folder to the user!");
        }
      
      })
  }

  removeAccess(item : any){
   
    if (confirm("Please confirm! you want to remove access?") == true) {
    
    var fileId = this.shareFileId;
    var unShareData = {
      'user_id' : item.user_id,
      'company_type' : item.company_type,
      'company_id' : item.company_id
    }
    this.roasterService.unShareFolder(this.roasterId, fileId,unShareData).subscribe(
      data =>{
        if(data['success'] == true){
          this.sharedUsersLists();
          this.toastrService.success("Share access has been removed successfully.")
        }else{
          this.toastrService.error("Error while removing the access to the user");
        }
      }
    )
  }
}

changePermissions(term : any, item : any){
  var permission = term;
  var fileId = this.shareFileId;
  var shareData = {
    "user_id": item.user_id,
    "permission": permission,
    "company_type": item.company_type,
    "company_id": item.company_id
  }
  this.roasterService.updatePermissions(this.roasterId,fileId,shareData).subscribe(
    data => {
      console.log(data)
      if(data['success'] == true){
        // setTimeout(() => {
        //   this.sharedUsersLists();
        // }, 1000);
        this.toastrService.success("Permission has been updated successfully.")
      }else{
        this.toastrService.error("Error while changing the Share permissions");
      }
    }
  )
}

}
