import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResizeableComponent } from '@base-components';
import { FileType } from '@enums';
import { TranslateService } from '@ngx-translate/core';
import { ResizeService } from '@services';
import { FileShareService } from '../../file-share.service';

@Component({
    selector: 'app-file-table',
    templateUrl: './file-table.component.html',
    styleUrls: ['./file-table.component.scss'],
})
export class FileTableComponent extends ResizeableComponent implements OnInit {
    @Input() listType = '';
    @Input() emptyTitle = this.translator.instant('no_data_available');
    tableColumns = [];
    disableAction = false;

    constructor(
        private router: Router,
        private translator: TranslateService,
        protected resizeService: ResizeService,
        public fileShareSrv: FileShareService,
    ) {
        super(resizeService);
    }

    ngOnInit(): void {
        this.isDesktop$.subscribe((value) => {
            this.createTable();
        });
    }

    createTable() {
        this.tableColumns = [
            this.resizeService.isMobile()
                ? null
                : {
                      field: 'checkbox',
                      header: 'checkbox',
                      width: this.resizeService.isDesktop() ? 8 : 8,
                  },
            {
                field: 'name',
                header: 'files',
                sortable: true,
                width: this.resizeService.isDesktop() ? 34 : 33,
            },
            this.resizeService.isMobile()
                ? null
                : {
                      field: 'order_ids',
                      header: 'order_id',
                      sortable: true,
                      width: this.resizeService.isDesktop() ? 12 : 12,
                  },
            this.resizeService.isMobile()
                ? null
                : {
                      field: 'updated_at',
                      header: 'modified',
                      sortable: true,
                      width: this.resizeService.isDesktop() ? 22 : 25,
                  },
            this.resizeService.isMobile()
                ? null
                : {
                      field: 'type',
                      header: 'type',
                      sortable: true,
                      width: this.resizeService.isDesktop() ? 10 : 12,
                  },
            this.resizeService.isMobile()
                ? null
                : {
                      field: 'actions',
                      header: '',
                      width: this.resizeService.isDesktop() ? 14 : 10,
                  },
        ].filter(Boolean);
    }

    onClick(item) {
        if (!this.disableAction) {
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
    }

    menuClicked() {
        // Stop propagation
        this.disableAction = true;
        setTimeout(() => {
            this.disableAction = false;
        }, 100);
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
