import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { FileShareService } from '../file-share.service';

@Component({
    selector: 'app-file-share-list',
    templateUrl: './file-share-list.component.html',
    styleUrls: ['./file-share-list.component.scss'],
})
export class FileShareListComponent implements OnInit {
    breadItems: any[];
    menuItems: any[];
    rangeDates: Date[];
    showQuicker = true;
    queryParams: any;

    constructor(public fileShareSrv: FileShareService, public globals: GlobalsService) {}

    ngOnInit(): void {
        this.fileShareSrv.folderId = 0;
        this.breadItems = [
            { label: this.globals.languageJson?.home, routerLink: '/' },
            { label: this.globals.languageJson?.file_share },
        ];
        this.menuItems = [
            { label: this.globals.languageJson?.my_files, routerLink: ['/file-share/my-files'] },
            { label: this.globals.languageJson?.shared_with_me, routerLink: ['/file-share/shared-files'] },
        ];

        this.fileShareSrv.clearQueryParams();
        this.queryParams = { ...this.fileShareSrv.queryParams.getValue() };

        this.fileShareSrv.getPinnedFilesorFolders();
        this.fileShareSrv.viewMode.next('table');
    }

    filterCall() {
        this.fileShareSrv.queryParams.next({ ...this.queryParams });
    }
}
