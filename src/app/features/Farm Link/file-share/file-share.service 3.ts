import { Injectable } from '@angular/core';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileShareService {
  pinnedData : any = [];
  filesTerm:any;
  filterTerm:any;
  roasterId: any;
  parentId: any = 0;
  mainData: any;
  constructor(
    public roasterService : RoasterserviceService,
    public toastrService : ToastrService,
    public cookieService : CookieService,
    public http : HttpClient
  ) { 
    this.roasterId = this.cookieService.get('roaster_id');
  }

  
  // getCountries() {
  //   return this.http.get<any>('assets/countries.json')
  //     .toPromise()
  //     .then(res => <any[]>res.data)
  //     .then(data => { return data; });
  //   }

  public getFilesandFolders(){
    console.log("calling from file share");
    this.roasterService.getFilesandFolders(this.roasterId,this.parentId).subscribe(
      result => {
        console.log(result);
        if(result['success']==true){
          console.log(result);
          this.mainData = result['result'];
        }else{
          this.toastrService.error("Error while getting the Files and Folders");
        }
      }
    )
  }

  public  getPinnedFilesorFolders(){
    this.roasterService.getPinnedFilesandFolders(this.roasterId).subscribe(
      data => {
        if(data['success']==true){
          console.log(data);
          this.pinnedData = data['result'];
        }else{
          this.toastrService.error("Error while getting the pinned files/folders");
        }
      }
    )
  }


}
