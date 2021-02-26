import { Injectable } from '@angular/core';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class FileShareService {
    pinnedData: any = [];
    filesTerm: any;
    filterTerm: any;
    roasterId: any;
    parentId: any = 0;
    mainData: any;

    constructor(
        public roasterService: RoasterserviceService,
        public toastrService: ToastrService,
        public cookieService: CookieService,
        public http: HttpClient,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
    }

    public getFilesandFolders() {
        this.roasterService.getFilesandFolders(this.roasterId, this.parentId).subscribe((res: any) => {
            if (res.success) {
                console.log('File List:', res.result);
                this.mainData = res.result;
            } else {
                this.toastrService.error('Error while getting the Files and Folders');
            }
        });
    }

    public getPinnedFilesorFolders() {
        this.roasterService.getPinnedFilesandFolders(this.roasterId).subscribe((res: any) => {
            if (res.success) {
                console.log(res.result);
                this.pinnedData = res.result;
            } else {
                this.toastrService.error('Error while getting the pinned files/folders');
            }
        });
    }
}
