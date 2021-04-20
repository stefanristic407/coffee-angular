import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { DraftPostsComponent } from '@modules/coffee-lab/create-post/draft-posts/draft-posts.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
    menuItems = [
        {
            label: 'qa_post',
            routerLink: 'question',
            icon: 'assets/images/qa-forum.svg',
            activeIcon: 'assets/images/qa-forum-active.svg',
        },
        {
            label: 'recipe_post',
            routerLink: 'recipe',
            icon: 'assets/images/coffee-recipe.svg',
            activeIcon: 'assets/images/coffee-recipe-active.svg',
        },
        {
            label: 'article',
            routerLink: 'article',
            icon: 'assets/images/article.svg',
            activeIcon: 'assets/images/article-active.svg',
        },
    ];

    constructor(
        public location: Location,
        public dialogService: DialogService,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {}

    onOpenDraftPosts(): void {
        this.dialogService.open(DraftPostsComponent, {
            showHeader: false,
            styleClass: 'draft-posts',
        });
    }
}
