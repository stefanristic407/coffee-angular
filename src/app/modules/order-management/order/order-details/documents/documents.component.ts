import { Component, OnInit } from '@angular/core';
import { DestroyableComponent } from '@base-components';
import { OrderDocument } from '@models';
import { OrderManagementService } from '@modules/order-management/order-management.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent extends DestroyableComponent implements OnInit {
    page = 1;
    showLoadMore = true;
    documents: OrderDocument[] = [];
    owners: any[] = [];
    owner: any = {};

    constructor(private orderService: OrderManagementService) {
        super();
    }

    ngOnInit(): void {
        this.orderService.documents$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((documents) => {
            this.showLoadMore = this.orderService.documentsTotalCount > documents.length;
            this.documents = documents;
            this.owners = this.documents
                .map((x) => x.file_owner)
                .filter((val, index, arr) => val && arr.indexOf(val) === index)
                .map((x) => ({ label: x, value: x }));
        });
    }

    loadMore(): void {
        this.orderService.loadDocuments(++this.page);
    }

    downloadFile(document: OrderDocument): void {
        window.open(document.url, '_blank');
    }

    downloadAll(): void {
        this.documents.forEach((d) => this.downloadFile(d));
    }
}
