import { Component, Input, OnInit } from '@angular/core';
import { FileShareService } from '../file-share.service';

@Component({
    selector: 'app-file-card',
    templateUrl: './file-card.component.html',
    styleUrls: ['./file-card.component.scss'],
})
export class FileCardComponent implements OnInit {
    @Input() data: any;

    constructor(public fileShareSrv: FileShareService) {}

    ngOnInit(): void {}
}
