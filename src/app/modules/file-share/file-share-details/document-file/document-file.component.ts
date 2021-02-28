import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FileShareService } from '../../file-share.service';
@Component({
    selector: 'app-document-file',
    templateUrl: './document-file.component.html',
    styleUrls: ['./document-file.component.scss'],
})
export class DocumentFileComponent implements OnInit, OnDestroy {
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
