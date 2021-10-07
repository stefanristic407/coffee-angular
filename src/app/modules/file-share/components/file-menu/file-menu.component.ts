import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilePermission } from '@enums';
import { FileShareService } from '../../file-share.service';

@Component({
    selector: 'app-file-menu',
    templateUrl: './file-menu.component.html',
    styleUrls: ['./file-menu.component.scss'],
})
export class FileMenuComponent implements OnInit {
    @Input() data;
    @Output() clickEvent = new EventEmitter<any>();
    readonly FilePermission = FilePermission;

    constructor(public fileShareSrv: FileShareService) {}

    ngOnInit(): void {}

    click() {
        // Stop propagation
        this.clickEvent.emit();
    }
}
