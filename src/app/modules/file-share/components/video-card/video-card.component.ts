import { Component, Input, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { FileShareService } from '../../file-share.service';

@Component({
    selector: 'app-video-card',
    templateUrl: './video-card.component.html',
    styleUrls: ['./video-card.component.scss'],
})
export class VideoCardComponent implements OnInit {
    @Input() data: any;

    constructor(public fileShareSrv: FileShareService, public globals: GlobalsService) {}

    ngOnInit(): void {}
}
