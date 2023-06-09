import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { FileService, ResizeService } from '@services';
import { FileShareService } from '../file-share.service';
import { Action } from '@enums';
import { ResizeableComponent } from '@base-components';

@Component({
    selector: 'app-file-share-details',
    templateUrl: './file-share-details.component.html',
    styleUrls: ['./file-share-details.component.scss'],
})
export class FileShareDetailsComponent extends ResizeableComponent implements OnInit {
    breadItems: any[] = [];
    menuItems: any[];
    folderDetail: any;
    sortItems: any[] = [
        { label: 'Name (A-Z)', value: 'name' },
        { label: 'Recently added', value: 'created_at' },
    ];
    queryParams: any = {};
    sharedUsers: any[];
    viewMode = 'grid';
    viewModeItems: any[] = [{ value: 'table' }, { value: 'grid' }];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private translator: TranslateService,
        protected resizeService: ResizeService,
        public fileService: FileService,
        public fileShareSrv: FileShareService,
        public toastrService: ToastrService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.changeViewMode();
        this.fileShareSrv.action$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((action: Action) => {
            if (action === Action.REFRESH) {
                this.fileShareSrv.getAllFiles();
            } else if (action === Action.DATA_RETRIEVED) {
                this.refreshBreadCrumb();
            }
        });
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
        this.sharedUsersLists();
    }

    checkRoute() {
        const curUrl = this.router.url.split('/').pop();
        if (curUrl.startsWith('documents')) {
            if (this.resizeService.isMobile()) {
                this.fileShareSrv.viewMode.next('table');
            }
            this.fileShareSrv.queryParams.next({ type: 'FOLDER,CSV,DOCUMENT,IMAGE' });
        } else {
            if (this.resizeService.isMobile()) {
                this.fileShareSrv.viewMode.next('grid');
            }
            this.fileShareSrv.queryParams.next({ type: 'VIDEO' });
        }
    }

    refreshMenuItems() {
        this.menuItems = [
            {
                label: this.translator.instant('documents'),
                routerLink: [`/file-share/file-share-details/${this.fileShareSrv.folderId}/documents`],
            },
            {
                label: this.translator.instant('videos'),
                routerLink: [`/file-share/file-share-details/${this.fileShareSrv.folderId}/videos`],
            },
        ];
    }

    refreshBreadCrumb() {
        this.breadItems = [
            { label: this.translator.instant('home'), routerLink: '/' },
            { label: this.translator.instant('brand_experience') },
            { label: this.translator.instant('education_collaboration'), routerLink: '/file-share' },
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
        this.fileService.getSharedUsers(this.fileShareSrv.folderId).subscribe((res: any) => {
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
