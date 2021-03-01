import { Component, OnInit, OnDestroy } from '@angular/core';
import { FileShareService } from '../../file-share.service';

import { GlobalsService } from 'src/services/globals.service';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-video-file',
    templateUrl: './video-file.component.html',
    styleUrls: ['./video-file.component.scss'],
})
export class VideoFileComponent implements OnInit, OnDestroy {
    actionSub: Subscription;

    constructor(public fileShareSrv: FileShareService, private globals: GlobalsService) {}

    ngOnInit(): void {
        if (this.globals.device === 'mobile') {
            this.fileShareSrv.viewMode.next('grid');
        }
        this.actionSub = this.fileShareSrv.action$.subscribe((action) => {
            this.fileShareSrv.getVideos();
        });
    }

    ngOnDestroy() {
        if (this.actionSub) {
            this.actionSub.unsubscribe();
        }
    }
}
