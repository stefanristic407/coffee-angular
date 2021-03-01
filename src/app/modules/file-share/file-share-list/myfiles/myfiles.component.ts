import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FileShareService } from '../../file-share.service';

@Component({
    selector: 'app-myfiles',
    templateUrl: './myfiles.component.html',
    styleUrls: ['./myfiles.component.scss'],
})
export class MyfilesComponent implements OnInit, OnDestroy {
    actionSub: Subscription;

    constructor(public fileShareSrv: FileShareService) {}

    ngOnInit(): void {
        this.actionSub = this.fileShareSrv.action$.subscribe((action) => {
            this.fileShareSrv.getFilesandFolders();
        });
    }

    ngOnDestroy() {
        if (this.actionSub) {
            this.actionSub.unsubscribe();
        }
    }
}
