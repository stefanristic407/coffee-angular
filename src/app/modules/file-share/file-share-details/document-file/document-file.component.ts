import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { Subscription } from 'rxjs';
import { FileShareService } from '../../file-share.service';

@Component({
    selector: 'app-document-file',
    templateUrl: './document-file.component.html',
    styleUrls: ['./document-file.component.scss'],
})
export class DocumentFileComponent implements OnInit, OnDestroy {
    actionSub: Subscription;
    constructor(public fileShareSrv: FileShareService, private globals: GlobalsService) {}

    ngOnInit(): void {
        if (this.globals.device === 'mobile') {
            this.fileShareSrv.viewMode.next('table');
        }
        this.actionSub = this.fileShareSrv.action$.subscribe((action) => {
            this.fileShareSrv.getDocuments();
        });
    }

    ngOnDestroy() {
        if (this.actionSub) {
            this.actionSub.unsubscribe();
        }
    }
}
