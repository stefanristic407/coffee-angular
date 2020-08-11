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
  
  constructor(public router: Router,
    public roasterService : RoasterserviceService,
    public toastrService : ToastrService,
    public cookieService : CookieService,
    public fileService : FileShareService,
    public route : ActivatedRoute,
    private modalService: BsModalService,
    public filedetailsService : FileShareDetailsService
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

}
