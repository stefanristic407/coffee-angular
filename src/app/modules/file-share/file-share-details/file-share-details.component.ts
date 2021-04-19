import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FileService, RoasterserviceService } from '@services';
import { GlobalsService } from '@services';
import { FileShareService } from '../file-share.service';
import { Subscription } from 'rxjs';
import { Action } from '@enums';

@Component({
    selector: 'app-file-share-details',
    templateUrl: './file-share-details.component.html',
    styleUrls: ['./file-share-details.component.scss'],
})
export class FileShareDetailsComponent implements OnInit, OnDestroy {
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
    actionSub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public cookieService: CookieService,
        public toastrService: ToastrService,
        public roasterService: RoasterserviceService,
        public fileShareSrv: FileShareService,
        public fileService: FileService,
        public globals: GlobalsService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        this.route.paramMap.subscribe((params) => {
            if (params.has('folderId')) {
                this.fileShareSrv.folderId = params.get('folderId');
                this.refreshMenuItems();
                this.getFolderDetails();
                this.fileShareSrv.clearQueryParams();
                this.queryParams = { ...this.fileShareSrv.queryParams.getValue() };
                this.checkRoute();
                this.fileShareSrv.action.next(Action.REFRESH);
            }
        });
    }

    ngOnInit(): void {
        this.changeViewMode();
        this.actionSub = this.fileShareSrv.action$.subscribe((action: Action) => {
            if (action === Action.REFRESH) {
                this.fileShareSrv.getFilesandFolders();
            } else if (action === Action.DATA_RETRIEVED) {
                this.refreshBreadCrumb();
            }
        });
        this.sharedUsersLists();
    }

    ngOnDestroy() {
        if (this.actionSub) {
            this.actionSub.unsubscribe();
        }
    }

    checkRoute() {
        const curUrl = this.router.url.split('/').pop();
        if (curUrl.startsWith('documents')) {
            if (this.globals.device === 'mobile') {
                this.fileShareSrv.viewMode.next('table');
            }
            this.fileShareSrv.queryParams.next({ type: 'FOLDER,CSV,DOCUMENT,IMAGE' });
        } else {
            if (this.globals.device === 'mobile') {
                this.fileShareSrv.viewMode.next('grid');
            }
            this.fileShareSrv.queryParams.next({ type: 'VIDEO' });
        }
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
        ];
        const folder = this.fileShareSrv.fileTree[this.fileShareSrv.folderId];
        if (folder?.parents) {
            folder.parents.forEach((element) => {
                this.breadItems.push({
                    label: this.fileShareSrv.fileTree[element].name,
                    routerLink: `/file-share/file-share-details/${element}`,
                });
            });
        }
        this.breadItems.push({ label: this.fileShareSrv.fileTree[this.fileShareSrv.folderId].name });
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
        this.fileService.getFolder(this.fileShareSrv.folderId).subscribe((res: any) => {
            if (res.success) {
                this.folderDetail = res.result;
            } else {
                this.toastrService.error('Error while getting the folder details');
            }
        });
    }

    filterCall() {
        this.fileShareSrv.queryParams.next({ ...this.queryParams });
    }

    changeViewMode() {
        this.fileShareSrv.viewMode.next(this.viewMode);
    }
}
