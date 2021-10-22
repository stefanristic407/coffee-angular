import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-saved-posts-view',
    templateUrl: './saved-posts-view.component.html',
    styleUrls: ['./saved-posts-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SavedPostsViewComponent implements OnInit, AfterViewInit {
    menuItems = [
        {
            label: 'qa_post',
            routerLink: ['qa-post'],
            command: (event) => {
                this.removeClass(event);
            },
        },
        {
            label: 'posts',
            routerLink: ['article'],
            command: (event) => {
                this.removeClass(event);
            },
        },
        {
            label: 'brewing_guides',
            routerLink: ['recipe'],
            command: (event) => {
                this.removeClass(event);
            },
        },
        {
            label: 'saved_answers',
            routerLink: ['saved-answers'],
            command: (event) => {
                this.removeClass(event);
            },
        },
    ];

    constructor(private router: Router) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        const ele = document.getElementsByClassName('remove-menu');
        if (this.router.url.split('/')[this.router.url.split('/').length - 1] === 'qa-post') {
            if (window.innerWidth <= 767) {
                ele[0].children[0].scrollLeft = 0;
            }
        } else if (this.router.url.split('/')[this.router.url.split('/').length - 1] === 'article') {
            if (window.innerWidth <= 767) {
                ele[0].children[0].scrollLeft = 30;
            }
        } else if (this.router.url.split('/')[this.router.url.split('/').length - 1] === 'recipe') {
            if (window.innerWidth <= 767) {
                ele[0].children[0].scrollLeft = 130;
            }
        } else if (this.router.url.split('/')[this.router.url.split('/').length - 1] === 'saved-answers') {
            if (window.innerWidth <= 767) {
                ele[0].children[0].scrollLeft = 230;
            }
        }
    }

    removeClass(event) {
        const ele = document.getElementsByClassName('remove-menu');
        if (event.item.label === 'qa_post') {
            if (window.innerWidth <= 767) {
                ele[0].children[0].scrollLeft = 0;
            }
        } else if (event.item.label === 'posts') {
            if (window.innerWidth <= 767) {
                ele[0].children[0].scrollLeft = 30;
            }
        } else if (event.item.label === 'brewing_guides') {
            if (window.innerWidth <= 767) {
                ele[0].children[0].scrollLeft = 130;
            }
        } else if (event.item.label === 'saved-answers') {
            if (window.innerWidth <= 767) {
                ele[0].children[0].scrollLeft = 230;
            }
        }
    }
}
