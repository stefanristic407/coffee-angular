import { Component, Input, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { FileShareService } from '../../file-share.service';

@Component({
    selector: 'app-file-card',
    templateUrl: './file-card.component.html',
    styleUrls: ['./file-card.component.scss'],
})
export class FileCardComponent implements OnInit {
    @Input() data: any;
    @Input() showPin = false;

    constructor(public fileShareSrv: FileShareService, public globals: GlobalsService) {}

    ngOnInit(): void {}
}
