import { Injectable } from '@angular/core';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FileShareDetailsService {
  roasterId: any;
  parentId: any;
  mainData: any;
  mainVideoData: any;
  parentName: any;
  folderId: any;

  constructor(
    public roasterService : RoasterserviceService,
    public cookieService : CookieService,
    public toastrService : ToastrService,
    public router : Router
  ) {
    this.roasterId = this.cookieService.get('roaster_id')
   }

public getFilesandFolders(){
  console.log("Call from document table", this.parentId)
  this.roasterService.getFilesandFolders(this.roasterId,this.parentId).subscribe(
    result => {
      console.log(result);
      if(result['success']==true){
        this.mainData = result['result'];
      }else{
        this.toastrService.error("Error while getting the Files and Folders");
      }
    }
  )
}

public getTableVideos(){
  this.roasterService.getVideos(this.roasterId,this.parentId).subscribe(
    result=>{
      //console.log(result);
      if(result['success']==true){
        this.mainVideoData = result['result'];
        this.parentName=this.mainVideoData[0].parent_name;
      }else{
        this.toastrService.error("Error while getting the Videos");
      }
    }
  )
}

public shareDetails(size: any){
  this.folderId = size.id;
  console.log(this.folderId)
  let navigationExtras: NavigationExtras = {
    queryParams: {
      "folderId": this.folderId,
    }
    
  }
  this.router.navigate(['/features/file-share-details'], navigationExtras);
  // location.reload()
} 
}
