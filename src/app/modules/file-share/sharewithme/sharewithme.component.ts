import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FileShareService } from '../file-share.service';

@Component({
    selector: 'app-sharewithme',
    templateUrl: './sharewithme.component.html',
    styleUrls: ['./sharewithme.component.scss'],
})
export class SharewithmeComponent implements OnInit, OnDestroy {
    actionSub: Subscription;

    constructor(public fileShareSrv: FileShareService) {}

    ngOnInit(): void {
        this.actionSub = this.fileShareSrv.action$.subscribe((action) => {
            this.fileShareSrv.getSharedFilesandFolders();
        });
    }

    ngOnDestroy() {
        if (this.actionSub) {
            this.actionSub.unsubscribe();
        }
    }
}
