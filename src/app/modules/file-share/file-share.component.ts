import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { FileShareService } from './file-share.service';

@Component({
    selector: 'app-file-share',
    templateUrl: './file-share.component.html',
    styleUrls: ['./file-share.component.scss'],
})
export class FileShareComponent implements OnInit {
    breadItems: any[];
    menuItems: any[];
    rangeDates: Date[];
    showQuicker = true;

    constructor(public fileShareSrv: FileShareService, public globals: GlobalsService) {}

    ngOnInit(): void {
        this.breadItems = [
            { label: this.globals.languageJson?.home, routerLink: '/' },
            { label: this.globals.languageJson?.file_share },
        ];
        this.menuItems = [
            { label: this.globals.languageJson?.my_files, routerLink: ['/file-share/my-files'] },
            { label: this.globals.languageJson?.shared_with_me, routerLink: ['/file-share/shared-files'] },
        ];

        this.fileShareSrv.getPinnedFilesorFolders();
    }

    filterCall() {}
}
