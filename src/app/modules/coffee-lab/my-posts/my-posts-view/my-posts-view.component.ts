import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-my-posts-view',
    templateUrl: './my-posts-view.component.html',
    styleUrls: ['./my-posts-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MyPostsViewComponent implements OnInit, AfterViewInit {
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
            label: 'my_answers',
            routerLink: ['answer'],
            command: (event) => {
                this.removeClass(event);
            },
        },
        {
            label: 'my_comments',
            routerLink: ['comment'],
            command: (event) => {
                this.removeClass(event);
            },
        },
    ];

    constructor(private router: Router) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        const ele = document.getElementsByClassName('remove-menu-post');
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
                ele[0].children[0].scrollLeft = 170;
            }
        } else if (this.router.url.split('/')[this.router.url.split('/').length - 1] === 'answer') {
            if (window.innerWidth <= 767) {
                ele[0].children[0].scrollLeft = 320;
            }
        } else if (this.router.url.split('/')[this.router.url.split('/').length - 1] === 'comment') {
            if (window.innerWidth <= 767) {
                ele[0].children[0].scrollLeft = 480;
            }
        }
    }

    removeClass(event) {
        const ele = document.getElementsByClassName('remove-menu-post');
        if (event.item.label === 'qa_post') {
            if (window.innerWidth <= 991) {
                ele[0].children[0].scrollLeft = 0;
            }
        } else if (event.item.label === 'posts') {
            if (window.innerWidth <= 767) {
                ele[0].children[0].scrollLeft = 30;
            }
        } else if (event.item.label === 'brewing_guides') {
            if (window.innerWidth <= 767) {
                ele[0].children[0].scrollLeft = 170;
            }
        } else if (event.item.label === 'my_answers') {
            if (window.innerWidth <= 767) {
                ele[0].children[0].scrollLeft = 320;
            }
        } else if (event.item.label === 'my_comments') {
            if (window.innerWidth >= 768 || window.innerWidth <= 991) {
                ele[0].children[0].scrollLeft = 100;
            }
            if (window.innerWidth <= 767) {
                ele[0].children[0].scrollLeft = 480;
            }
        }
    }
}
