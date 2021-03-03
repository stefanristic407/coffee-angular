import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '@services';
import { FileService } from '@services';
import { FileShareService } from '../../file-share.service';
import { FileType } from '@core/enums';

@Component({
    selector: 'app-file-table',
    templateUrl: './file-table.component.html',
    styleUrls: ['./file-table.component.scss'],
})
export class FileTableComponent implements OnInit {
    @Input() listType = '';
    tableValue = [];
    totalCount = 0;
    tableColumns = [];
    selectedItems = [];
    menuItems = [];
    selectedFile: any;
    rangeDates: any[];
    data;

    constructor(
        public dialogSrv: DialogService,
        public router: Router,
        public fileSrv: FileService,
        public toastrService: ToastrService,
        public fileShareSrv: FileShareService,
        public globals: GlobalsService,
    ) {}

    ngOnInit(): void {
        this.menuItems = [
            {
                label: this.globals.languageJson?.download,
                command: () => {
                    this.fileShareSrv.downloadFile(this.selectedFile);
                },
            },
            {
                label: this.globals.languageJson?.share,
                command: () => {
                    this.fileShareSrv.openShareModal(this.selectedFile);
                },
            },
            {
                label: this.globals.languageJson?.pin,
                command: () => {
                    this.fileShareSrv.pinFileorFolder(this.selectedFile.id);
                },
            },
            {
                label: this.globals.languageJson?.rename,
                command: () => {
                    if (this.selectedFile.type === 'FOLDER') {
                        this.fileShareSrv.updateFolder(this.selectedFile);
                    } else {
                        this.fileShareSrv.updateFile(this.selectedFile);
                    }
                },
            },
            {
                label: this.globals.languageJson?.delete,
                command: () => {
                    this.fileShareSrv.openDeleteModal(this.selectedFile);
                },
            },
        ];
        this.createTable();
    }

    createTable() {
        this.tableColumns = [
            {
                field: 'name',
                header: 'files',
                sortable: true,
                width: this.globals.device === 'desktop' ? 34 : 33,
            },
            {
                field: 'order_ids',
                header: 'order_id',
                sortable: true,
                width: this.globals.device === 'desktop' ? 12 : 12,
            },
            {
                field: 'updated_at',
                header: 'modified',
                sortable: true,
                width: this.globals.device === 'desktop' ? 22 : 25,
            },
            {
                field: 'type',
                header: 'type',
                sortable: true,
                width: this.globals.device === 'desktop' ? 10 : 12,
            },
            {
                field: 'actions',
                header: '',
                sortable: false,
                width: this.globals.device === 'desktop' ? 14 : 10,
            },
        ];
    }

    onClick(item) {
        switch (item.type) {
            case FileType.CSV: {
                break;
            }
            case FileType.DOCUMENT: {
                break;
            }
            case FileType.FOLDER: {
                this.router.navigateByUrl(`/file-share/file-share-details/${item.id}`);
                break;
            }
            case FileType.IMAGE: {
                this.fileShareSrv.preview(item);
                break;
            }
            case FileType.VIDEO: {
                this.fileShareSrv.preview(item);
                break;
            }
        }
    }

    filterCall(event) {
        console.log(event);
        // setTimeout(() => {
        //     this.sourcingSrv.queryParams.next({
        //         ...this.queryParams,
        //         sort_by: event.sortField,
        //         sort_order: event.sortOrder === 1 ? 'asc' : 'desc',
        //     });
        // });
    }
}
