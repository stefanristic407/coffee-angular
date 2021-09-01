import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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

    constructor(public fileShareSrv: FileShareService, private translator: TranslateService) {}

    ngOnInit(): void {
        this.fileShareSrv.folderId = 0;
        this.breadItems = [
            { label: this.translator.instant('home'), routerLink: '/' },
            { label: this.translator.instant('brand_experience') },
            { label: this.translator.instant('education_collaboration') },
        ];
        this.menuItems = [
            { label: this.translator.instant('my_files'), routerLink: ['/file-share/my-files'] },
            { label: this.translator.instant('shared_with_me'), routerLink: ['/file-share/shared-files'] },
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
