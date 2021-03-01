import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { RoasterserviceService } from '@services';
import { GlobalsService } from '@services';
import { FileShareService } from '../file-share.service';
import { FileShareDetailsService } from './file-share-details.service';

@Component({
    selector: 'app-file-share-details',
    templateUrl: './file-share-details.component.html',
    styleUrls: ['./file-share-details.component.scss'],
})
export class FileShareDetailsComponent implements OnInit {
    breadItems: any[] = [];
    menuItems: any[];
    folderDetail: any;
    sortItems: any[] = [
        { label: 'Name (A-Z)', value: 'name' },
        { label: 'Recently added', value: 'created_at' },
    ];
    queryParams: any = {};
    sharedUsers: any[];
    roasterId: string;
    viewMode = 'grid';
    viewModeItems: any[] = [{ value: 'table' }, { value: 'grid' }];

    constructor(
        private route: ActivatedRoute,
        public cookieService: CookieService,
        public toastrService: ToastrService,
        public roasterService: RoasterserviceService,
        public fileShareSrv: FileShareService,
        public filedetailsService: FileShareDetailsService,
        public globals: GlobalsService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        this.route.paramMap.subscribe((params) => {
            if (params.has('folderId')) {
                this.fileShareSrv.folderId = params.get('folderId');
                this.refreshMenuItems();
                this.getFolderDetails();
                this.fileShareSrv.action.next('refresh');
            }
        });
    }

    ngOnInit(): void {
        this.changeViewMode();
        this.sharedUsersLists();
    }

    refreshMenuItems() {
        this.menuItems = [
            {
                label: this.globals.languageJson?.documents,
                routerLink: [`/file-share/file-share-details/${this.fileShareSrv.folderId}/documents`],
            },
            {
                label: this.globals.languageJson?.videos,
                routerLink: [`/file-share/file-share-details/${this.fileShareSrv.folderId}/videos`],
            },
        ];
    }

    refreshBreadCrumb() {
        this.breadItems = [
            { label: this.globals.languageJson?.home, routerLink: '/' },
            { label: this.globals.languageJson?.file_share, routerLink: '/file-share' },
            { label: this.folderDetail.name },
        ];
    }

    sharedUsersLists() {
        this.roasterService.getSharedUserList(this.roasterId, this.fileShareSrv.folderId).subscribe((res: any) => {
            if (res.success) {
                this.sharedUsers = res.result;
            } else {
                this.toastrService.error('Error while getting the shared users');
            }
        });
    }

    getFolderDetails() {
        this.roasterService.getFolderDetails(this.roasterId, this.fileShareSrv.folderId).subscribe((res: any) => {
            if (res.success) {
                this.folderDetail = res.result;
                this.refreshBreadCrumb();
            } else {
                this.toastrService.error('Error while getting the folder details');
            }
        });
    }

    filterCall() {}

    changeViewMode() {
        this.fileShareSrv.viewMode.next(this.viewMode);
    }
}
