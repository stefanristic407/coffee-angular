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
            label: 'article',
            routerLink: ['article'],
            command: (event) => {
                this.removeClass(event);
            },
        },
        {
            label: 'recipe',
            routerLink: ['recipe'],
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
            ele[0].children[0].children[0].className = ele[0].children[0].children[0].className.concat(' p-highlight');
            if (window.innerWidth <= 767) {
                ele[0].children[0].scrollLeft = -30;
            }
        } else if (this.router.url.split('/')[this.router.url.split('/').length - 1] === 'article') {
            ele[0].children[0].children[1].className = ele[0].children[0].children[1].className.concat(' p-highlight');
            if (window.innerWidth <= 767) {
                ele[0].children[0].scrollLeft = 30;
            }
        } else if (this.router.url.split('/')[this.router.url.split('/').length - 1] === 'recipe') {
            ele[0].children[0].children[2].className = ele[0].children[0].children[2].className.concat(' p-highlight');
            if (window.innerWidth <= 767) {
                ele[0].children[0].scrollLeft = 80;
            }
        }
    }

    removeClass(event) {
        const ele = document.getElementsByClassName('remove-menu');
        if (event.item.label === 'qa-post') {
            ele[0].children[0].children[1].className = 'p-tabmenuitem';
            ele[0].children[0].children[2].className = 'p-tabmenuitem';
            if (window.innerWidth <= 767) {
                ele[0].children[0].scrollLeft = -80;
            }
        } else if (event.item.label === 'article') {
            ele[0].children[0].children[0].className = 'p-tabmenuitem';
            ele[0].children[0].children[2].className = 'p-tabmenuitem';
            if (window.innerWidth <= 767) {
                ele[0].children[0].scrollLeft = 30;
            }
        } else if (event.item.label === 'recipe') {
            ele[0].children[0].children[0].className = 'p-tabmenuitem';
            ele[0].children[0].children[1].className = 'p-tabmenuitem';
            if (window.innerWidth <= 767) {
                ele[0].children[0].scrollLeft = 80;
            }
        }
        console.log(ele);
        // const container = document.getElementById('container');
        // let scrollCompleted = 0;
        // const slideVar = setInterval(() => {
        //     if (event.item.label === 'qa-post') {
        //         container.scrollLeft -= 10;
        //     } else if (event.item.label === 'article') {
        //         container.scrollLeft += 10;
        //     } else if (event.item.label === 'recipe') {
        //         container.scrollLeft += 10;
        //     }

        //     scrollCompleted += 10;
        //     if (scrollCompleted >= 100) {
        //         window.clearInterval(slideVar);
        //     }
        // }, 50);
    }
}
