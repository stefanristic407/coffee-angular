import { Component, Input, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
import { FileShareService } from '../file-share.service';

@Component({
    selector: 'app-file-card',
    templateUrl: './file-card.component.html',
    styleUrls: ['./file-card.component.scss'],
})
export class FileCardComponent implements OnInit {
    @Input() data: any;
    menuItems = [];

    constructor(public fileShareSrv: FileShareService, public globals: GlobalsService) {}

    ngOnInit(): void {
        this.menuItems = [
            {
                label: this.globals.languageJson?.download,
                command: () => {
                    this.fileShareSrv.downloadFile(this.data);
                },
            },
            {
                label: this.globals.languageJson?.share,
                command: () => {
                    this.fileShareSrv.openShareModal(this.data);
                },
            },
            {
                label: this.globals.languageJson?.pin,
                command: () => {
                    this.fileShareSrv.pinFileorFolder(this.data.id);
                },
            },
            {
                label: this.globals.languageJson?.rename,
                command: () => {
                    if (this.data.type === 'FOLDER') {
                        this.fileShareSrv.updateFolder(this.data);
                    } else {
                        this.fileShareSrv.updateFile(this.data);
                    }
                },
            },
            {
                label: this.globals.languageJson?.comment,
                command: () => {
                    console.log(this.globals.languageJson?.comment);
                },
            },
            {
                label: this.globals.languageJson?.delete,
                command: () => {
                    this.fileShareSrv.openDeleteModal(this.data);
                },
            },
        ];
    }
}
