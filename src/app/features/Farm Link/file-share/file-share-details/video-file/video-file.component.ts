import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileShareService } from '../../file-share.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PlyrModule } from 'ngx-plyr';
import * as Plyr from 'plyr';
import { FileShareDetailsService } from '../file-share-details.service';

import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { GlobalsService } from 'src/services/globals.service';
@Component({
  selector: 'app-video-file',
  templateUrl: './video-file.component.html',
  styleUrls: ['./video-file.component.css']
})
export class VideoFileComponent implements OnInit {
  roasterId: string;
  parentId: string;
  mainVideoData: any;
  parentName: any;
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  modalRef: BsModalRef;
  file_name: any;
  file_id: any;
  file_description: any;
  file_url: any;
  fileName: string;
  fileNameValue: any;
  fileEvent: FileList;
  files: any;
  fileNameError: string;
  fileDescription: string;
  filedescriptionError: string;
  url: any;
  
  typedValue: any;
  usersList: any;
  selectedOption: any;
  company_id: any;
  user_id_value: any;
  company_type: any;
  sharedUserslists: any = [];
  sharedUsers: any;
  shareFileId: any;
  share_permission: any;
  
  selectedValue: string;
  appLanguage?: any;
  resetButtonValue: string ="Share";
  constructor(public router: Router,
    public roasterService : RoasterserviceService,
    public toastrService : ToastrService,
    public cookieService : CookieService,
    public fileService : FileShareService,
    public route : ActivatedRoute,
    private modalService: BsModalService,
    public filedetailsService : FileShareDetailsService,
    private globals: GlobalsService
    ) {
      this.roasterId = this.cookieService.get('roaster_id');
      // this.filedetailsService.parentId = decodeURIComponent(this.route.snapshot.queryParams['folderId']);
      // this.filedetailsService.parentId = this.filedetailsService.folderId;

      this.route.queryParams.subscribe(params => {
        this.filedetailsService.parentId = params['folderId'];
        console.log(this.filedetailsService.parentId);
        this.filedetailsService.getTableVideos();
      });
    }

  ngOnInit(): void {
    
    this.appLanguage = this.globals.languageJson;
    //Auth checking
     if (this.cookieService.get("Auth") == "") {
      this.router.navigate(["/auth/login"]);
    }
    // this.filedetailsService.getTableVideos();

  }
 
  openModal(template: TemplateRef<any>,item:any){
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


openShareModal(shareTemplate : TemplateRef<any>,item : any){
  this.shareFileId = item.id;
this.modalRef = this.modalService.show(shareTemplate);
this.sharedUsersLists();
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

  // getTableVideos(){
  //   this.roasterService.getVideos(this.roasterId,this.parentId).subscribe(
  //     result=>{
  //       //console.log(result);
  //       if(result['success']==true){
  //         this.mainVideoData = result['result'];
  //         console.log(this.mainVideoData);
  //         this.parentName=this.mainVideoData[0].parent_name;
  //       }else{
  //         this.toastrService.error("Error while getting the Videos");
  //       }
  //     }
  //   )
  // }
  deleteFile(id:any){
    if (confirm("Please confirm! you want to delete?") == true) {
    this.roasterService.deleteFile(this.roasterId,id).subscribe(
      data => {
        if(data['success']==true){
          this.toastrService.success("The Selected file is deleted successfully");
          setTimeout(() => {
          this.filedetailsService.getTableVideos();
          }, 2000);
        }
        else{
          this.toastrService.error("Error while deleting the File");
        }
      }
    )
    }
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
  
  reUploadFile(event:any){
    this.files = event.target.files;
    this.fileEvent = this.files;
    console.log(this.fileEvent);
    this.fileNameValue = this.files[0].name;
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
          this.toastrService.error("Please upload the file to update the file details");
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
                this.filedetailsService.getTableVideos();
                this.modalRef.hide();
              }else{
                this.toastrService.error("Error while updating the file details");
                this.modalRef.hide();
              }
            }
          )
          }
     
    }

    
  shareFileAndFolder(){
    this.resetButtonValue = "Sharing";
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
          this.resetButtonValue = "Share";
          this.sharedUsersLists();
          this.toastrService.success("The folder has been shared to the User sucessfully!")
        }
        else{
          this.resetButtonValue = "Share";
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
        // this.sharedUsersLists();
        this.toastrService.success("Permission has been updated successfully.")
      }else{
        this.toastrService.error("Error while changing the Share permissions");
      }
    }
  )
}



}
