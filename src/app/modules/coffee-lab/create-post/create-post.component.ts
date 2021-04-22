import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { DraftPostsComponent } from '@modules/coffee-lab/create-post/draft-posts/draft-posts.component';

@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
    constructor(public location: Location, public dialogService: DialogService) {}

    ngOnInit(): void {}

    onOpenDraftPosts(): void {
        this.dialogService.open(DraftPostsComponent, {
            showHeader: false,
            styleClass: 'draft-posts',
        });
    }
}
