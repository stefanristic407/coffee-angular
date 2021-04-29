import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-draft-posts',
    templateUrl: './draft-posts.component.html',
    styleUrls: ['./draft-posts.component.scss'],
})
export class DraftPostsComponent implements OnInit {
    drafts: any[] = [];

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
    ) {}

    ngOnInit(): void {
        this.drafts = this.config.data;
    }
}
