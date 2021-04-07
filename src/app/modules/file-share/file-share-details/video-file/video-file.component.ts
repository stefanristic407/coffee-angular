import { Component, OnInit } from '@angular/core';
import { FileShareService } from '../../file-share.service';
import { GlobalsService } from '@services';
@Component({
    selector: 'app-video-file',
    templateUrl: './video-file.component.html',
    styleUrls: ['./video-file.component.scss'],
})
export class VideoFileComponent implements OnInit {
    constructor(public fileShareSrv: FileShareService, private globals: GlobalsService) {}

    ngOnInit(): void {
        if (this.globals.device === 'mobile') {
            this.fileShareSrv.viewMode.next('grid');
        }
        this.fileShareSrv.queryParams.next({ type: 'VIDEO' });
    }
}
