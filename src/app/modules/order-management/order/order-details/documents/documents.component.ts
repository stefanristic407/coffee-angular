import { Component, Input, OnInit } from '@angular/core';
import { DestroyableComponent } from '@base-components';
import { OrgType } from '@enums';
import { OrderDocument } from '@models';
import { OrdersService } from '@services';
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
    selectedDocuments: OrderDocument[] = [];
    owners: any[] = [];
    owner: any = {};

    @Input() orgType: OrgType;

    constructor(private orderService: OrdersService) {
        super();
    }

    ngOnInit(): void {
        this.orderService.documents$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((documents) => {
            this.showLoadMore = this.documents.length === documents.length;
            this.documents = documents;
            this.owners = this.documents
                .map((x) => x.fileOwner)
                .filter((val, index, arr) => val && arr.indexOf(val) === index)
                .map((x) => ({ label: x, value: x }));
        });
    }

    loadMore(): void {
        this.orderService.loadDocuments(this.orgType, ++this.page);
    }

    downloadFile(document: OrderDocument): void {
        window.open(document.url, '_blank');
    }

    downloadAll(): void {
        this.documents.forEach((d) => this.downloadFile(d));
    }
}
