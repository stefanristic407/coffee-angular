import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { DraftPostsComponent } from '@modules/coffee-lab/create-post/draft-posts/draft-posts.component';
import { NavigationStart, Router } from '@angular/router';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
    drafts: any[] = [];

    constructor(
        public location: Location,
        public dialogService: DialogService,
        private toastrService: ToastrService,
        public coffeeLabService: CoffeeLabService
    ) {}

    ngOnInit(): void {
        this.getDrafts();
    }

    getDrafts(): void {
        this.coffeeLabService.getDrafts().subscribe((res: any) => {
            if (res.success) {
                this.drafts = res.result || [];
            } else {
                this.toastrService.error('Failed to get drafts');
            }
        });
    }

    onOpenDraftPosts(): void {
        this.dialogService.open(DraftPostsComponent, {
            showHeader: false,
            styleClass: 'draft-posts',
            data: this.drafts,
        });
    }
}
