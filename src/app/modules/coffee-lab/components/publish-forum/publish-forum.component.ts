import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { PostType } from '@enums';
import { AuthService } from '@services';

@Component({
    selector: 'app-publish-forum',
    templateUrl: './publish-forum.component.html',
    styleUrls: ['./publish-forum.component.scss'],
})
export class PublishForumComponent implements OnInit {
    readonly Postype = PostType;
    @Input() type = PostType.QA;
    btnValues = {
        [PostType.ARTICLE]: {
            firstBtnValue: 'ask_a_question',
            secondBtnValue: 'create_brew_guide',
            placeHolderValue: 'write_post',
        },
        [PostType.RECIPE]: {
            firstBtnValue: 'ask_a_question',
            secondBtnValue: 'write_post',
            placeHolderValue: 'create_brew_guide',
        },
        [PostType.QA]: {
            firstBtnValue: 'write_post',
            secondBtnValue: 'create_brew_guide',
            placeHolderValue: 'ask_a_question',
        },
    };
    hideContent: boolean;

    constructor(public authService: AuthService, private router: Router) {}

    ngOnInit(): void {}

    onFocus() {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                type: this.type,
            },
        };
        this.router.navigate(['coffee-lab/create-post/tab'], navigationExtras);
    }

    onSecondBtn() {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                type: this.type,
            },
        };
        if (this.type === PostType.ARTICLE || this.type === PostType.QA) {
            navigationExtras.queryParams.type = PostType.RECIPE;
        } else if (this.type === PostType.RECIPE) {
            navigationExtras.queryParams.type = PostType.ARTICLE;
        }
        this.router.navigate(['coffee-lab/create-post/tab'], navigationExtras);
    }

    onFirstBtn() {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                type: '',
            },
        };
        if (this.type === PostType.ARTICLE || this.type === PostType.RECIPE) {
            navigationExtras.queryParams.type = PostType.QA;
        } else if (this.type === PostType.QA) {
            navigationExtras.queryParams.type = PostType.ARTICLE;
        }

        this.router.navigate(['coffee-lab/create-post/tab'], navigationExtras);
    }
}
