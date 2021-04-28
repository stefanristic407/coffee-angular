import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { DraftPostsComponent } from '@modules/coffee-lab/create-post/draft-posts/draft-posts.component';
import { NavigationStart, Router } from '@angular/router';
import { CoffeeLabService } from '@services';

@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
    constructor(
        public location: Location,
        public dialogService: DialogService,
        private router: Router,
        public coffeeLabService: CoffeeLabService
    ) {}

    ngOnInit(): void {
        console.log('this.router.url >>>>>>>>>>', this.router.url);
        this.router.events.forEach((event) => {
            if (event instanceof NavigationStart) {
                console.log('route change event >>>>>>>', event);
            }
        });
    }

    onOpenDraftPosts(): void {
        this.dialogService.open(DraftPostsComponent, {
            showHeader: false,
            styleClass: 'draft-posts',
        });
    }
}
